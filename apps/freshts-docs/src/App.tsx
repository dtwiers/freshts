import fresh from './freshts.svg';
import styles from './App.module.css';
import { Navbar } from './components/navbar/navbar';
import { Router } from '@solidjs/router';

function App() {
  return (
    <Router>
      <div class={styles.App}>
        <Navbar />
          <div class={styles.headingContainer}>
            <img src={fresh} class={styles.logo} alt="logo" />
            <h1 class={styles.heading}>fresh-ts</h1>
          </div>
          <p>Libraries for the Pragmatic Functional Programmer</p>
      </div>
    </Router>
  );
}

export default App;
