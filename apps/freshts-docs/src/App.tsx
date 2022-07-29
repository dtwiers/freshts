import fresh from './freshts.svg';
import styles from './App.module.css';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div class={styles.headingContainer}>
          <img src={fresh} class={styles.logo} alt="logo" />
          <h1 class={styles.heading}>fresh-ts</h1>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a class={styles.link} href="https://github.com/solidjs/solid" target="_blank" rel="noopener noreferrer">
          Learn Solid
        </a>
      </header>
    </div>
  );
}

export default App;
