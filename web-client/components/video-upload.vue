<template>
  <v-dialog :value="active" persistent width="1000">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complte="step > 1" step="1">Select Type</v-stepper-step>

        <v-divider/>

        <v-stepper-step :complte="step > 2" step="2">Upload Video</v-stepper-step>

        <v-divider/>

        <v-stepper-step :complte="step > 3" step="3">Trick Information</v-stepper-step>

        <v-divider/>

        <v-stepper-step step="4">Review</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="d-flex flex-column align-center">
            <v-btn class="my-2" @click="() => setType(uploadType.TRICK)">Trick</v-btn>
            <v-btn class="my-2" @click="() => setType(uploadType.SUBMISSION)">Submission</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div>
            <v-file-input accept="video/*" @change="handleFileUpload"/>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div>
            <v-text-field label="Tricking Name" v-model="trickName"/>
            <v-btn @click="saveTrick">Save Trick</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="4">
          <div>Success</div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <div class="d-flex justify-center my-4">
      <v-btn @click="toggleActivity">Close</v-btn>
    </div>
  </v-dialog>
</template>
<script>
import {UPLOAD_TYPE} from '../data/enum'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'IndexPage',
  data: () => ({
    trickName: "",
  }),
  computed: {
    ...mapState('video-upload', ['uploadPromise', 'active', 'step']),
    uploadType: () => ({...UPLOAD_TYPE})
  },
  methods: {
    ...mapMutations('video-upload', ['reset', 'toggleActivity', 'setType']),
    ...mapActions("video-upload", ["uploadVideo", "createTrick"]),
    async handleFileUpload(file) {
      if (!file) return;

      let form = new FormData()
      form.append('video', file)
      this.uploadVideo({form})
    },
    async saveTrick() {
      if (!this.uploadPromise) {
        return
      }

      const video = await this.uploadPromise
      await this.createTrick({
        trick: {
          name: this.trickName,
          video
        }
      })
      this.trickName = ""
      this.reset()
    },
  },
  async fetch() {

  }
}
</script>

