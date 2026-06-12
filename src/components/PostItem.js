import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import styles from "../styles/Home.module.css";

const PostItem = ({ imgURL, title, rating, description, tags = [] }) => (
  <section className={styles.card}>
    <Image
      unoptimized
      src={imgURL || "/placeholder.png"}
      fill
      alt={title}
      className={styles.imgWrap}
    />

    <div className={styles.division}>
      <h3>{title}</h3>

      <p>{description}</p>

      <h4>{rating}</h4>

      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <Link key={index} href={`/tags/${tag}`}>
            <div
              className={clsx({
                [styles.hrec]: tag === "highly recommended",
                [styles.rec]: tag === "recommended",
                [styles.outstanding]: tag === "outstanding",
                [styles.country]:
                  tag === "dominican republic" ||
                  tag === "finland" ||
                  tag === "spain",
              })}
            >
              <h5>{tag}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default PostItem;
