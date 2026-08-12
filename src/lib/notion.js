const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");

const dbID = process.env.NEXT_PUBLIC_DATABASE_ID;
const notionToken = process.env.NEXT_PUBLIC_NOTION_TOKEN;

const notion = new Client({
  auth: notionToken,
});

const n2m = new NotionToMarkdown({
  notionClient: notion,
});

// Notion API 2025-09-03 split "databases" into a container plus one or
// more "data sources" underneath it. Queries now target a data_source_id
// instead of a database_id. NEXT_PUBLIC_DATABASE_ID is still a database
// ID, so we resolve the data source once and cache it, since this blog's
// database only has a single data source.
let dataSourceIdPromise = null;

const getDataSourceId = () => {
  if (!dataSourceIdPromise) {
    dataSourceIdPromise = notion.databases
      .retrieve({ database_id: dbID })
      .then((database) => database.data_sources[0].id);
  }
  return dataSourceIdPromise;
};

export const getAllPublished = async () => {
  const dataSourceId = await getDataSourceId();

  const posts = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return posts.results.map((post) => getPageMetaData(post)).filter(Boolean);
};

const getPageMetaData = (post) => {
  if (!post) return null;

  return {
    id: post.id || null,
    title: post.properties.Snack.title?.[0]?.plain_text || "",
    rating: post.properties.Rating.rich_text?.[0]?.plain_text || "",
    description: post.properties.Description.rich_text?.[0]?.plain_text || "",
    image: post.properties.Image?.url || "",
    tags: post.properties.Tags.multi_select?.map((tag) => tag.name) || [],
    date: getToday(post.properties.Date?.created_time),
  };
};

function getToday(datestring) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export const getPostBySnack = async (snack) => {
  try {
    const dataSourceId = await getDataSourceId();

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Snack",
        formula: {
          string: {
            equals: snack.trim(),
          },
        },
      },
    });

    const page = response.results[0];

    if (!page) return null;

    const metadata = getPageMetaData(page);

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      metadata,
      markdown: mdString,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPostsByTag = async (tag) => {
  try {
    const dataSourceId = await getDataSourceId();

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Tags",
        multi_select: {
          contains: tag,
        },
      },
    });

    return response.results
      .map((post) => getPageMetaData(post))
      .filter(Boolean);
  } catch (err) {
    console.error(err);
    return [];
  }
};
