<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complte="step > 1" step="1">Trick Information</v-stepper-step>

      <v-divider/>

      <v-stepper-step step="2">Review</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div>
          <v-text-field dense label="Name" v-model="form.name"/>
          <v-text-field dense label="Description" v-model="form.description"/>
          <v-select :items="difficultyItems" v-model="form.difficulty" label="Difficulty"/>
          <v-select :items="trickItems" v-model="form.prerequisites" label="Prerequisites" multiple small-chips chips
                    deletable-chips/>
          <v-select :items="trickItems" v-model="form.progressions" label="Progressions" multiple small-chips chips
                    deletable-chips/>
          <v-select :items="categoryItems" v-model="form.categories" label="Categories" multiple small-chips chips
                    deletable-chips/>
          <v-btn @click="step++">Next</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="2">
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
    id: "",
    name: "",
    description: "",
    difficulty: "",
    prerequisites: "",
    progressions: "",
    category: ""
  },
})

export default {
  name: "trick-steps",
  data: initState,
  computed: {
    ...mapState('video-upload', ['active']),
    ...mapGetters('tricks', ['categoryItems', 'difficultyItems', 'trickItems'])
  },
  watch: {
    'active': function (newValue) {
      if (!newValue) {
        Object.assign(this.$data, initState())
      }
    }
  },
  methods: {
    ...mapMutations('video-upload', ['reset']),
    ...mapActions("tricks", ["createTrick"]),
    async save() {
      await this.createTrick({
        form: this.form
      })
      this.reset()
      Object.assign(this.$data, initState())
    },
  },
}
</script>

<style scoped>

</style>
