export const state = () => ({
  token: '',
  user: {},
})

export const mutations = {
  updateToken (state, tokenUpdated) {
    state.token = tokenUpdated
  },
  removeToken (state) {
    state.token = ''
  },
  updateUser (state, userUpdated) {
    state.user = userUpdated
  },
  removeUser (state) {
    state.user = {}
  },
}
