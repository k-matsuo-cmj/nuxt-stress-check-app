import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const state = () => ({
  user: null,
})

export const getters = {
  isAuthenticate(state) {
    return !!state.user
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
}
