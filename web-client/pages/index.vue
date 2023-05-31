<template>
  <div>

    <div v-if="tricks">
      <div v-for="t in tricks">
        {{ t.name }}
        <div>
          <video :src="`http://localhost:5186/api/videos/${t.video}`" width="500" controls/>
        </div>
      </div>
    </div>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complte="step > 1" step="1">Upload Video</v-stepper-step>

        <v-divider/>

        <v-stepper-step :complte="step > 2" step="1">Trick Information</v-stepper-step>

        <v-divider/>

        <v-stepper-step :complte="step > 3" step="1">Confirmation</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div>
            <v-file-input accept="video/*" @change="handleFileUpload"/>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div>
            <v-text-field label="Tricking Name" v-model="trickName"/>
            <v-btn @click="saveTrick">Save Trick</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div>Success</div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'IndexPage',
  data: () => ({
    trickName: "",
    step: 1
  }),
  computed: {
    ...mapState('tricks', ['tricks']),
    ...mapState('videos', ['uploadPromise'])
  },
  methods: {
    ...mapMutations(['videos'], {
      resetVideos: 'reset'
    }),
    ...mapActions('tricks', ['fetchTricks', 'createTrick']),
    ...mapActions("videos", ["uploadVideo"]),
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
      this.step++
    },
    async handleFileUpload(file) {
      if (!file) return;

      let form = new FormData()
      form.append('video', file)
      this.uploadVideo({form})
      this.step++
    }
  },
  async fetch() {
    await this.fetchTricks()
  }
}
</script>
