const initState = () => ({
  message: ""
})

export const state = initState

export const mutations = {
  reset(state) {
    Object.assign(state, initState())
  }
}

export const actions = {
  async fetchMessage({commit, dispatch}) {
    await dispatch('tricks/fetchTricks')
  }
}
