<template>
  <v-dialog :value="active" persistent width="1000">
    <template v-slot:activator="{on}">
      <v-btn depressed @click="toggleActivity">
        Upload
      </v-btn>
    </template>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complte="step > 1" step="1">Select Type</v-stepper-step>

        <div v-if="type === uploadType.TRICK">
          <v-divider/>

          <v-stepper-step :complte="step > 2" step="2">Trick Information</v-stepper-step>
        </div>

        <v-divider/>

        <v-stepper-step :complte="step > 3" step="3">Upload Video</v-stepper-step>

        <v-divider/>

        <v-stepper-step :complte="step > 4" step="4">Submission Information</v-stepper-step>

        <v-divider/>

        <v-stepper-step step="5">Review</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="d-flex flex-column align-center">
            <v-btn class="my-2" @click="() => setType({type:uploadType.TRICK})">Trick</v-btn>
            <v-btn class="my-2" @click="() => setType({type:uploadType.SUBMISSION})">Submission</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div>
            <v-text-field label="Tricking Name" v-model="trickName"/>
            <v-btn @click="incStep">Save Trick</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div>
            <v-file-input accept="video/*" @change="handleFileUpload"/>
          </div>
        </v-stepper-content>
        <v-stepper-content step="4">
          <div>
            <v-text-field label="Description" v-model="submission"/>
            <v-btn @click="save">Save</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="5">
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
    submission: ""
  }),
  computed: {
    ...mapState('video-upload', ['uploadPromise', 'active', 'step', 'type']),
    uploadType: () => ({...UPLOAD_TYPE})
  },
  methods: {
    ...mapMutations('video-upload', ['reset', 'toggleActivity', 'setType', 'incStep']),
    ...mapActions("video-upload", ["uploadVideo", "createTrick"]),
    async handleFileUpload(file) {
      if (!file) return;

      let form = new FormData()
      form.append('video', file)
      this.uploadVideo({form})
    },
    async save() {
      if (!this.uploadPromise) {
        return
      }

      const video = await this.uploadPromise
      await this.createTrick({
        trick: {
          id:"",
          name: this.trickName,
        },
        submission: {
          video,
          description: this.submission,
        }
      })
      this.trickName = ""
      this.submission = ""
      this.reset()
    },
  },
  async fetch() {

  }
}
</script>

