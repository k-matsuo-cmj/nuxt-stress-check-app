import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'

export const state = () => ({
  user: null,
  checkStarted_at: null,
  finished: false,
})

export const getters = {
  isAuthenticate(state) {
    return !!state.user
  },
  isChecking(state) {
    return !!state.checkStarted_at
  },
}

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }
    } else {
      state.user = null
    }
  },
  setChecking(state, flag) {
    state.checkStarted_at = flag ? Timestamp.now() : null
  },
  setFinished(state, flag) {
    state.finished = flag
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  async login({ commit }, { email, password }) {
    const userCredential = await signInWithEmailAndPassword(
      this.$auth,
      email,
      password
    )
    commit('setUser', userCredential.user)
  },
  async logout({ commit }) {
    await signOut(this.$auth)
    commit('setUser', null)
  },
  startCheck({ commit }) {
    commit('setChecking', true)
  },
  async finishCheck({ commit, state }, { answers }) {
    // Firestore
    const resultsRef = collection(this.$db, 'results')
    await addDoc(resultsRef, {
      user_id: state.user.uid,
      started_at: state.checkStarted_at,
      finished_at: serverTimestamp(),
      answers,
    })
    commit('setChecking', false)
    commit('setFinished', true)
  },
  clearFinished({ commit }) {
    commit('setFinished', false)
  },
}
