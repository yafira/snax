import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  // keeps the end year current
  const year = new Date().getFullYear();

  return (
    <div className={styles.Footer}>
      <h3>
        © 2023–{year} · snacked, sipped &amp; rated with{" "}
        <FontAwesomeIcon icon={faHeart} style={{ color: "#B2A4D4" }} /> by
        <a href="https://electrocute.io"> electrocute</a>
      </h3>
    </div>
  );
}
