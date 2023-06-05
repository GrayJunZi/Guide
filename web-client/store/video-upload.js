import {UPLOAD_TYPE} from '../data/enum'

const initState = () => ({
  uploadPromise: null,
  active: false,
  type: "",
  step: 1
})

export const state = initState

export const mutations = {
  toggleActivity(state) {
    state.active = !state.active
    if (!state.active) {
      this.reset(state)
    }
  },
  setType(state, {type}) {
    state.type = type
    if (type === UPLOAD_TYPE.TRICK) {
      state.step++
    } else if (type === UPLOAD_TYPE.SUBMISSION) {
      state.step += 2;
    }
  },
  incStep(state) {
    state.step++
  },
  setTask(state, {uploadPromise}) {
    state.uploadPromise = uploadPromise
    state.step++
  },
  reset(state) {
    Object.assign(state, initState())
  }
}

export const actions = {
  uploadVideo({commit, dispatch}, {form}) {
    const uploadPromise = this.$axios.$post('/api/videos', form)
    commit("setTask", {uploadPromise})
  },
  async createTrick({state, commit, dispatch}, {trick, submission}) {
    if (state.type === UPLOAD_TYPE.TRICK) {
      const createdTrick = await this.$axios.$post('/api/tricks', trick)
      submission.trickId = createdTrick.id

    }

    const createSubmission = await this.$axios.$post('/api/submissions', submission)
    await dispatch('tricks/fetchTricks', null, {root: true})
    await dispatch('submissions/fetchSubmissions', null, {root: true})
  }
}
