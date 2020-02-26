export default function ({ store, redirect }) {
  // Try to get token cookie if token isn't set
  if (! store.state.user.token || ! store.state.user.user) {
    let token = document.cookie.match(new RegExp('(^| )token=([^;]+)'))
    if (token) {
      store.dispatch('user/setToken', token[2])

      let user = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
      if (user) {
        store.commit('user/updateUser', JSON.parse(user[2]))
      } else {
        console.log('test')
        try {
          store.dispatch('user/fetchUser')
        } catch (error) { }
      }
    }
  }

  // If the user is not authenticated
  if (! store.state.user.token || ! store.state.user.user) {
    return redirect('/login')
  }
}
