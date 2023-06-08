<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complte="step > 1" step="1">Upload Video</v-stepper-step>

      <v-divider/>

      <v-stepper-step :complte="step > 2" step="2">Select Trick</v-stepper-step>

      <v-divider/>

      <v-stepper-step :complte="step > 3" step="3">Submission</v-stepper-step>

      <v-divider/>

      <v-stepper-step step="4">Review</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div>
          <v-file-input accept="video/*" @change="handleFile"/>
        </div>
      </v-stepper-content>
      <v-stepper-content step="2">
        <div>
          <v-select :items="trickItems" v-model="form.trickId" label="Select Trick"/>
          <v-btn @click="step++">Next</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="3">
        <div>
          <v-text-field label="Description" v-model="form.description"/>
          <v-btn @click="step++">Next</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="4">
        <div>
          <v-btn @click="save">Save</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import {mapActions, mapMutations, mapState, mapGetters} from "vuex";

const initState = () => ({
  step: 1,
  form: {
    trickId: "",
    video: "",
    description: "",
  }
})

export default {
  name: "submission-steps",
  data: initState,
  computed: {
    ...mapGetters('tricks', ['trickItems']),
    ...mapState('video-upload', ['active'])
  },
  watch: {
    'active': function (newValue) {
      if (!newValue) {
        Object.assign(this.$data, initState())
      }
    }
  },
  methods: {
    ...mapMutations('video-upload', ['hide']),
    ...mapActions("video-upload", ["uploadVideo", "create"]),
    async handleFile(file) {
      if (!file) return;

      let form = new FormData()
      form.append('video', file)
      this.uploadVideo({form})
      this.step++
    },
    save() {
      this.create({form: this.form})
      this.reset()
    },
  },
}
</script>
