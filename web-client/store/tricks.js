import Axios from 'axios'

const initState = () => ({
  tricks: []
})

export const state = initState

export const mutations = {
  setTricks(state, tricks) {
    state.tricks = tricks
  },
  reset(state) {
    Object.assign(state, initState())
  }
}

export const actions = {
  async fetchTricks({commit}) {
    var {data: tricks} = await Axios.get('http://localhost:5186/api/tricks');
    console.log(tricks)
    commit("setTricks", tricks)
  },
  async createTrick({commit, dispatch}, {trick}) {
    await Axios.post('http://localhost:5186/api/tricks',trick)
    await dispatch('fetchTricks')
  }
}
