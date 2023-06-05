<template>
  <div>

    <div v-if="tricks">
      <div v-for="t in tricks">
        <v-btn :to="`/tricks/${t.id}`">{{ t.name}}</v-btn>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import VideoUpload from '../components/video-upload.vue'

export default {
  name: 'IndexPage',
  computed: {
    ...mapState('tricks', ['tricks']),
    ...mapState('submissions', ['submissions']),
  },
  components:{
    VideoUpload
  },
  async fetch(){
    await this.$store.dispatch("tricks/fetchTricks");
  }
}
</script>
