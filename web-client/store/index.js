import Axios from 'axios'

const initState = () => ({
  message: ""
})

export const state = initState

export const mutations = {
  setMessage(state, message) {
    state.message = message
  },
  reset(state) {
    Object.assign(state, initState())
  }
}

export const actions = {
  async fetchMessage({commit, dispatch}) {
    var {data: message} = await Axios.get('http://localhost:5186/api/home');
    commit("setMessage", message)
    await dispatch('tricks/fetchTricks')
  }
}
