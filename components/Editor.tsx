import Head from "next/head";
import styles from "../styles/Home.module.css"
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Editor = () => {
  const [text, setText] = useLocalStorage<string>("text", "");
  const [words, setWords] = useLocalStorage<number>("words", 0);
  const [flowing, setFlowing] = React.useState(false);
  const timeoutId = React.useRef<NodeJS.Timeout>();

  const flowBreak = () => {
    setFlowing(false);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  const updateText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // textdata logic
    const val = event.target.value;
    const words = val.split(/\s+/).filter(el => {
      return el !== ""
    });

    const count = words.length;

    setText(val);
    setWords(count);

    // flow logic
    if (!flowing) {
      setFlowing(true);
    }

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
    timeoutId.current = setTimeout(flowBreak, 1500)
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
          <span className={styles.scoring}>
            <span className={styles.center}>
              words: <span className={styles.score}>{words}</span>
            </span>
            <span className={styles.score}>
              {flowing ? "🔥" : "🤔"}
            </span>
          </span>

        <textarea 
          className={styles.gamearea}
          onChange={updateText}
          value={text}
        ></textarea>

        <div>
          <button 
            onClick={() => {navigator.clipboard.writeText(text)}} 
            className={styles.newButton}
          >
            Copy to Clipboard
          </button>
        </div>
      </main>
    </div>
  )
}

export default Editor;