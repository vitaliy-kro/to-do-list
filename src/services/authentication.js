import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { refs } from '../refs/refs';
import { UserInfo } from './userInformation';
import { createUserInformation } from '../markup/markup';
import addToDOM from './addToDOM';
import { itemsToMarkup } from './itemsToMarkup';
export const USER = new UserInfo();

const provider = new GoogleAuthProvider();
const auth = getAuth();
export function signIn() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    signContainerChange(user);
    itemsToMarkup(USER.isLogIn);
  } else {
    itemsToMarkup();
  }
});

export function signOff() {
  signOut(auth)
    .then(() => {
      USER.resetID();
      USER.resetName();
      USER.resetIsLogin();
      USER.resetUserImg();

      refs.signInButton.textContent = 'Log in';
      refs.signInButton.classList.replace('sign-button-out', 'sign-button-in');
      refs.userInformation.firstElementChild.remove();
    })
    .catch(error => {
      console.log(error);
    });
}

function signContainerChange(user) {
  if (user) {
    USER.id = user.uid;
    USER.name = user.displayName;
    USER.isLogIn = true;
    USER.userImg = user.photoURL;
    refs.signInButton.textContent = 'Logout';
    refs.signInButton.classList.replace('sign-button-in', 'sign-button-out');
    addToDOM(refs.userInformation, createUserInformation(USER.userImg));
  }
}
