<template>
  <div class="d-flex justify-center align-start">
    <div class="mx-2" v-if="submissions">
      <div v-for="s in submissions">
        {{ s.name }}
        <div>
          <video :src="`http://localhost:5186/api/videos/${s.video}`" width="500" controls/>
        </div>
      </div>
    </div>
    <v-sheet class="pa-3 ma-2 sticky">
      <div class="text-h6">{{ trick.name }}</div>
      <v-divider class="my-1"/>
      <div class="text-body-2">{{ trick.description }}</div>
      <div class="text-body-2">{{ trick.difficulty }}</div>
      <v-divider class="my-1"/>
      <div v-for="rd in relateData" v-if="rd.data.length > 0">
        <div class="text-subtitle-1">{{ rd.title }}</div>
        <v-chip-group>
          <v-chip v-for="d in rd.data" :key="rd.idFactory(d)" small :to="rd.routeFactory(d)">
            {{ d.name }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: "_trick",
  computed: {
    ...mapState('submissions', ['submissions']),
    ...mapState('tricks', ['categories', 'tricks']),
    ...mapGetters('tricks', ['trickById']),
    trick() {
      return this.trickById(this.$route.params.trick)
    },
    relateData() {
      return [
        {
          title: 'Categories',
          data: this.categories.filter(x => this.trick.categories.indexOf(x.id) >= 0),
          idFactory: x => `category-${x.id}`,
          routeFactory: x => `/category/${x.id}`,
        },
        {
          title: 'Prerequisites',
          data: this.tricks.filter(x => this.trick.prerequisites.indexOf(x.id) >= 0),
          idFactory: x => `trick-${x.id}`,
          routeFactory: x => `/trick/${x.id}`,
        },
        {
          title: 'Progressions',
          data: this.tricks.filter(x => this.trick.progressions.indexOf(x.id) >= 0),
          idFactory: x => `trick-${x.id}`,
          routeFactory: x => `/trick/${x.id}`,
        },
      ]
    }
  },
  async fetch() {
    const trickId = this.$route.params.trick;
    await this.$store.dispatch('submissions/fetchSubmissionsForTrick', {trickId}, {root: true})
  },
  head() {
    return {
      title: this.trick.name,
      meta: {
        hid: 'description',
        name: 'description',
        content: this.trick.description
      }
    }
  }
}
</script>

<style scoped>

</style>
