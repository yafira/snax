import Logo from "../assets/snax-logo.png";
import Hbg from "../assets/header.jpg";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import SearchBar from "./SearchBar";

// quick tag stickers, each with its own color and tilt
const quickTags = [
  { tag: "beverage", color: "mint", tilt: "-3deg" },
  { tag: "candy", color: "pink", tilt: "2deg" },
  { tag: "chips", color: "butter", tilt: "-1deg" },
  { tag: "cookies", color: "lilac", tilt: "3deg" },
  { tag: "outstanding", label: "outstanding ★", color: "white", tilt: "-2deg" },
];

export default function Header({ count }) {
  return (
    <header className={styles.Header}>
      {/* candy illustration band */}
      <div className={styles.band} aria-hidden="true">
        <Image
          src={Hbg}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.bandImg}
        />
      </div>

      <div className={styles.inner}>
        <div className={styles.topbar}>
          <Link href="/" className={styles.brand}>
            <Image className={styles.brandLogo} src={Logo} alt="" />
            <span>snax.blog</span>
          </Link>
          <nav className={styles.nav} aria-label="main">
            <Link href="/about">about</Link>
          </nav>
        </div>

        <div className={styles.hero}>
          <div className={styles.intro}>
            <div className={styles.pills} aria-label="eat, drink, color">
              <span className={styles.pink} style={{ "--tilt": "-4deg" }}>
                eat
              </span>
              <span className={styles.mint} style={{ "--tilt": "3deg" }}>
                drink
              </span>
              <span className={styles.lilac} style={{ "--tilt": "-2deg" }}>
                color
              </span>
            </div>

            <h1 className={styles.wordmark}>
              <Link href="/">snax</Link>
            </h1>

            <p className={styles.blurb}>
              Like a Pokedex but for vegan and plant-based snacks and bevs.
              Also a peanut-free zone.
            </p>

            <SearchBar />

            <div className={styles.tags}>
              {quickTags.map(({ tag, label, color, tilt }) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className={styles[color]}
                  style={{ "--tilt": tilt }}
                >
                  {label || tag}
                </Link>
              ))}
            </div>
          </div>

          <aside className={styles.facts} aria-label="snack facts">
            <h2>Snack Facts</h2>
            <div className={styles.serving}>serving size: 1 honest review</div>
            <div className={styles.row}>
              <span>vegan / plant-based</span>
              <strong>100%</strong>
            </div>
            <div className={styles.row}>
              <span>peanuts</span>
              <strong>0g</strong>
            </div>
            {count ? (
              <div className={styles.row}>
                <span>snacks reviewed</span>
                <strong>{count}</strong>
              </div>
            ) : null}
            <p className={styles.byline}>
              every snack consumed and reviewed by{" "}
              <Link href="https://yafira.xyz/">Yafira&nbsp;✿</Link>
            </p>
          </aside>
        </div>
      </div>
    </header>
  );
}
