<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo/>
        <VuetifyLogo/>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          {{ message }}

          <div v-if="tricks">
            <p v-for="t in tricks">{{ t.name }}</p>
          </div>


        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" @click="saveTrick">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
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
    }
  },
  async fetch() {
    // await this.$store.dispatch('fetchMessage')
  }
}
</script>
