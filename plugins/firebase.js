import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

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

  inject('auth', auth)

  // if reload...
  new Promise((resolve) => {
    auth.onAuthStateChanged((user) => resolve(user || false))
  }).then((user) => store.dispatch('setUser', user))
}
