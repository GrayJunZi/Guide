const initState = () => ({
  uploadPromise: null
})

export const state = initState

export const mutations = {
  setTask(state, {uploadPromise}) {
    state.uploadPromise = uploadPromise
  },
  reset(state) {
    Object.assign(state, initState())
  }
}

export const actions = {
  uploadVideo({commit, dispatch}, {form}) {
    const uploadPromise = this.$axios.$post('http://localhost:5186/api/videos', form)
    commit("setTask", {uploadPromise})
  }
}
