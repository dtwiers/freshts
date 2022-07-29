import { render } from 'solid-js/web';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('loading...');
  render(App, rootElement);
} else {
  console.error('root element not found')
}
