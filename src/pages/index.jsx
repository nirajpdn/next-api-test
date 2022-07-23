import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Static Props</title>
        <meta
          name="description"
          content="I am testing next api in staticProps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to test app</h1>
        <article className="card">
          <h2>Name : {data.name}</h2>
          <h2>Host : {data.host}</h2>
          <h2>Fetched data from : {data.fetched}</h2>
          <h2>Date : {new Date(data.date).toLocaleString()}</h2>
          <details>
            <summary className={styles.summary}>Headers</summary>
            {JSON.stringify(data.headers)
              .split(",")
              .map((item, index) => (
                <p key={index}>{item}</p>
              ))}
          </details>
        </article>
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  let data = { date: "", fetched: "", name: "", host: "", headers: {} };
  try {
    let response = await fetch("http://localhost:3000/api/data");
    data = await response.json();
  } catch (e) {
    fetch(`${process.env.NEXT_PUBLIC_DISCORD_WEBHOOK}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: JSON.stringify(e.message) }),
    })
      .then((res) => res)
      .catch((err) => {});
  }
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};
