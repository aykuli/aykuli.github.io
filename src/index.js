import './sass/style.scss';
import App from './App';
import domElements from './components/dom/dom';
import './components/hotKeys/hotKeys';

// Firebase project configuration from google-firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'aykuli-simple-piskel-clone.firebaseapp.com',
  databaseURL: 'https://aykuli-simple-piskel-clone.firebaseio.com',
  projectId: 'aykuli-simple-piskel-clone',
  storageBucket: 'aykuli-simple-piskel-clone.appspot.com',
  messagingSenderId: '958250490194',
  appId: '1:958250490194:web:ab19f66023057e3c7c828b',
};

const app = new App(domElements, {
  authConfig: firebaseConfig,
  pixelSize: 1,
  currentCount: 0,
  fps: 0,
  penSize: 1,
  piskelImg: [],
});

app.run();
