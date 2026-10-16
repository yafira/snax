import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/snax-logo.png";
import Footer from "@/components/Footer";
import styles from "@/styles/About.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <Head>
        <title>about · snax</title>
      </Head>

      <Link href="/" className={styles.brand}>
        <Image className={styles.brandLogo} src={Logo} alt="" />
        <span>snax.blog</span>
      </Link>

      <main className={styles.card}>
        <div className={styles.pills}>
          <span className={styles.pink}>snack hunter</span>
          <span className={styles.mint}>label reader</span>
          <span className={styles.lilac}>peanut-free, always</span>
        </div>

        <h1>hi, i&apos;m Yafira&nbsp;✿</h1>

        <p>
          I&apos;m always on the hunt for snacks, especially ones that are
          vegan and peanut-free, because that&apos;s what I am. I&apos;m also
          very into nice design, so a cute package catches my eye just as much
          as the flavor does.
        </p>
        <p>
          I started saving everything I tried in a little database, then
          figured, why not share it with the world? So here we are.
        </p>
        <p>
          Every snack and bev on here is one I&apos;ve actually eaten or
          sipped myself, with honest ratings for the good, the great, and the
          meh.
        </p>

        <Link href="/" className={styles.back}>
          ← back to the snax
        </Link>
      </main>

      <Footer />
    </div>
  );
}
