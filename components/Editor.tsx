import Head from "next/head";
import styles from "../styles/Home.module.css"
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Editor = () => {
  const [text, setText] = useLocalStorage<string>("text", "");
  const [words, setWords] = useLocalStorage<number>("words", 0);
  const [flowing, setFlowing] = React.useState(false);
  const [flowStart, setFlowStart] = React.useState<number>();
  const timeoutId = React.useRef<NodeJS.Timeout>();
  const comboLength = React.useRef(0);
  const comboPower = React.useRef(0);

  const flowPower = Math.floor(Math.log(comboPower.current));

  const comboScore = () => {
    const flowLength = flowStart ? Date.now() - flowStart : 0;
    return Math.round((flowLength / 100) * (comboLength.current / 10))
  };

  const flowBreak = () => {
    setFlowing(false);
    setFlowStart(0);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    comboLength.current = 0;
    comboPower.current = 0;

    console.log(comboPower);
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
      setFlowStart(Date.now())
    }

    comboLength.current += 1;
    comboPower.current = comboScore();

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
              {flowing ? "🔥".repeat(flowPower < 1 ? 1 : flowPower) : "🤔"}
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