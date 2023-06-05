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
    <div class="mx-2 sticky">
      1
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "_trick",
  computed: {
    ...mapState('submissions', ['submissions'])
  },
  async fetch() {
    const trickId = this.$route.params.trick;
    await this.$store.dispatch('submissions/fetchSubmissionsForTrick', {trickId}, {root: true})
  }
}
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 48px;
}
</style>
