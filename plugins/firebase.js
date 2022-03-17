import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default ({ $config, store }, inject) => {
  // configulation
  const firebaseConfig = {
    apiKey: $config.firebase.apiKey,
    authDomain: $config.firebase.authDomain,
    projectId: $config.firebase.projectId,
    storageBucket: $config.firebase.storageBucket,
    messagingSenderId: $config.firebase.messagingSenderId,
    appId: $config.firebase.appId,
  }

  // Initialize Firebase
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  // Authenticate
  const auth = getAuth(app)
  // Firestore
  const db = getFirestore(app)

  inject('auth', auth)
  inject('db', db)

  // if reload...
  new Promise((resolve) => {
    auth.onAuthStateChanged((user) => resolve(user || false))
  }).then((user) => store.dispatch('setUser', user))
}
