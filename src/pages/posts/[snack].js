import ReactMarkdown from "react-markdown";
import { getAllPublished, getPostBySnack } from "../../lib/notion.js";

const Post = ({ post }) => {
  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <section>
      <h3>{post.metadata.title}</h3>
      <span>{post.metadata.date}</span>
      <p>{post.metadata.tags.join(", ")}</p>
      <ReactMarkdown>{post.markdown}</ReactMarkdown>
    </section>
  );
};

export const getStaticProps = async ({ params }) => {
  const post = await getPostBySnack(params.snack);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPublished();

  const paths = posts.map(({ title }) => ({
    params: {
      snack: title.trim(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;
