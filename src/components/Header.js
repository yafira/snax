import Logo from "../assets/snax-logo.png";
import Hbg from "../assets/header.jpg";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.bgWrap}>
        <Image className={styles.hbg} src={Hbg} alt="header background image" />
      </div>

      <div className={styles.snaxBox}>
        <Link href="/">
          <Image className={styles.logo} src={Logo} alt="logo" />
          <h1>snax</h1>
        </Link>
        <h3>eat, drink, color</h3>
        <p>
          Like a Pokedex but for vegan/plant-based snacks and bevs, also a
          peanut-free zone.
        </p>
        <h5>
          All snacks are consumed and reviewed by{" "}
          <Link href="https://yafira.xyz/"> Yafira ✿ </Link>
        </h5>

        <SearchBar />
      </div>
    </div>
  );
}
