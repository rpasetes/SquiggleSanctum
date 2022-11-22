import Head from "next/head";
import styles from "../styles/Home.module.css"
import React from "react";

const Editor = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Squiggle Sanctum</title>
        <meta name="description" content="Plaintext is universal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SquiggleSanctum</h1>
        <textarea className={styles.gamearea}/>
      </main>
    </div>
  )
}

export default Editor;