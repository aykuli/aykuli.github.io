import { loginGoogleAccount, logoutGoogleAccount } from './firebaseFromGoogle';

require('@babel/register');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const options = {
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 10000000,
  runScripts: 'outside-only',
};

// создаем виртуальный DOM в Node.js
const domVirt = new JSDOM(
  `<!DOCTYPE html>
<html lang="en">
<body>
    <nav class="nav">
        <div class="nav__user" title="aynurshauerman2019@gmail.com">
            <img src="#" alt="" class="auth__photo" width="28" height="28">
            <span class="auth__name">aynur shauerman</span>
        </div>
        <button class="btn auth__login" style="display: none;">Sign in</button>
        <button class="btn auth__logout" style="display: block;">Sign out</button>
    </nav>
</body>
</html>
`,
  options
).window;

const authName = domVirt.window.document.querySelector('.auth__name');
const authPhoto = domVirt.window.document.querySelector('.auth__photo');
const authLoginBtn = domVirt.window.document.querySelector('.auth__login');
const authLogoutBtn = domVirt.window.document.querySelector('.auth__logout');

const firebase = {
  auth: () => {
    return {
      signOut: () => {},
      useDeviceLanguage: () => 'ru',
      signInWithPopup: () => {
        return new Promise((res, rej) => {
          res({
            user: {
              providerData: { 0: { photoURL: 'aykuli.github.io', displayName: 'Aynur' } },
              email: 'aynur@aynur.aynur',
            },
          });
          rej(new Error('ваш промис не промис'));
        });
      },
    };
  },
};

/* eslint-disable */
describe('logoutGoogleAccount for google authentification', () => {
  it('loginGoogleAccount should return authentification passed', () => {
    firebase.auth.GoogleAuthProvider = () => {};
    const createPopup = msg => msg;
    const authElements = [authName, authPhoto, authLoginBtn, authLogoutBtn];
    expect(loginGoogleAccount(firebase, authElements, createPopup)).toBe('authentification passed');
  });

  it('logoutGoogleAccount should mutate objects values', () => {
    const authElements = [authName, authPhoto, authLoginBtn, authLogoutBtn];

    authName.innerText = 'Aynur';
    authLoginBtn.style.display = 'flex';
    authLogoutBtn.style.display = 'flex';

    const res = logoutGoogleAccount(firebase, authElements);

    expect(authName.innerText).toBe('');
    expect(authLoginBtn.style.display).toBe('block');
    expect(authLogoutBtn.style.display).toBe('none');
    expect(res).toBe('user logged out');
  });
});
