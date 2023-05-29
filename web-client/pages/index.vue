<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4 d-flex justify-center">
        <v-file-input accept="video/*" @change="handleFileUpload"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Axios from 'axios'
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'IndexPage',
  computed: {
    ...mapState({
      message: state => state.message
    }),
    ...mapState('tricks', {
      tricks: state => state.tricks
    })
  },
  methods: {
    ...mapMutations(['reset']),
    ...mapMutations({
      resetTricks: 'reset'
    }),
    ...mapActions('tricks', ['createTrick']),
    async saveTrick() {
      await this.createTrick({trick: {name: `${+new Date()}`}})
    },
    async handleFileUpload(file) {
      if (!file) return;

      let form = new FormData()
      form.append('video', file)
console.log(file)
      const result = await Axios.post('http://localhost:5186/api/videos', form)
      console.log(result)
    }
  },
  async fetch() {
    // await this.$store.dispatch('fetchMessage')
  }
}
</script>
