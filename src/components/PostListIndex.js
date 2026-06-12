import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import PostItem from "./PostItem";

const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false },
);

const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false },
);

export default function PostListIndex({ posts }) {
  if (!posts || posts.length === 0) {
    return <h1>No snacks available.</h1>;
  }

  return (
    <main className={styles.main}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1,
          750: 2,
          900: 3,
          1000: 4,
          1200: 5,
        }}
      >
        <Masonry gutter="10px">
          {posts.map((post, index) => (
            <PostItem
              key={post.id || index}
              imgURL={post.image || ""}
              title={post.title || ""}
              rating={post.rating || ""}
              description={post.description || ""}
              tags={post.tags || []}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </main>
  );
}
