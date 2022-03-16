import categories from '~/assets/categories.json'
import questions from '~/assets/questions.json'

export const state = () => ({
  questions,
  categories,
})

export const getters = {
  ids(state) {
    return state.questions.map((q) => q.id).sort()
  },
  getById: (state) => (id) => {
    const ques = state.questions.find((q) => q.id === id)
    if (ques) ques.category = state.categories.find((c) => c.id === id[0])
    return ques
  },
}
