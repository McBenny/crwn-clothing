import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBdsqgbhmLc5QDX34F35b3-ucgV0vBKBPw",
  authDomain: "crwn-clothing-db-a0d2d.firebaseapp.com",
  projectId: "crwn-clothing-db-a0d2d",
  storageBucket: "crwn-clothing-db-a0d2d.firebasestorage.app",
  messagingSenderId: "425673007056",
  appId: "1:425673007056:web:fc2d34340e6d2ff106e3d5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch(error) {
      console.log('Error creating the user', error.message)
    }
  }
  return userDocRef
}