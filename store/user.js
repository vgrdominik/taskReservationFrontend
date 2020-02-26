export const state = () => ({
  token: '',
  user: null,
})

export const actions = {
  setToken(state, token) {
    this.$axios.setToken(token, 'Bearer')
    window.document.cookie = 'token=' + token
    state.commit('updateToken', token)
  },

  fetchUser (state) {
    this.$axios.get('/api/user')
      .then((response) => {
        if (response.data && response.data.data) {
          window.document.cookie = 'user=' + JSON.stringify(response.data.data)
          state.commit('updateUser', response.data.data)
        } else {
          state.commit('removeUser')
        }
      })
      .catch(() => state.user = null)
  },
}

export const mutations = {
  updateToken (state, tokenUpdated) {
    state.token = tokenUpdated
  },
  updateUser (state, userUpdated) {
    state.user = userUpdated
  },
  removeUser (state) {
    state.user = null
  },
}
