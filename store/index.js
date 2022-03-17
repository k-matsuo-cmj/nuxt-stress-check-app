import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const state = () => ({
  user: null,
  checkStarted_at: null,
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
    state.checkStarted_at = flag ? new Date() : null
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
  finishCheck({ commit }) {
    // TODO firestore
    commit('setChecking', false)
  },
}
