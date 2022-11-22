import Head from "next/head";
import styles from "../styles/Home.module.css"
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Editor = () => {
  const [text, setText] = useLocalStorage<string>("text", "");

  const updateText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = event.target.value;

    setText(val);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Squiggle Sanctum</title>
        <meta name="description" content="Plaintext is universal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SquiggleSanctum</h1>

        <textarea 
          className={styles.gamearea}
          onChange={updateText}
          value={text}
        ></textarea>
      </main>
    </div>
  )
}

export default Editor;