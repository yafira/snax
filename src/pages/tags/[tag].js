import { getPostsByTag } from "src/lib/notion";
import { useRouter } from "next/router";
import Header from "src/components/Header";
import TagHeader from "@/components/TagHeader";
import Footer from "@/components/Footer";
import PostListTags from "@/components/PostListTags";
import styles from "src/styles/Home.module.css";

export async function getServerSideProps({ params }) {
  const posts = await getPostsByTag(params.tag);

  return {
    props: {
      posts: posts || [],
    },
  };
}

const Tag = ({ posts }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Header />
      <TagHeader tag={router.query.tag} />
      <PostListTags posts={posts} />
      <Footer />
    </div>
  );
};

export default Tag;
