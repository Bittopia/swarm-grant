import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

// Replace these values with your Firebase project's configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
}

// Initialize Firebase with a "default" Firebase project
firebase.initializeApp(firebaseConfig)

export const db = firestore.getFirestore()
