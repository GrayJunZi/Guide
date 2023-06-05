<template>
  <div>

    <div v-if="tricks">
      <div v-for="t in tricks">
        {{ t.name }}
      </div>
    </div>

    <div v-if="submissions">
      <div v-for="s in submissions">
        {{ s.name }}
        <div>
          <video :src="`http://localhost:5186/api/videos/${s.video}`" width="500" controls/>
        </div>
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
  }
}
</script>
