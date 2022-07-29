import { render } from 'solid-js/web';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  render(App, rootElement);
}
