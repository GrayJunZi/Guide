<template>
  <v-app dark>
    <v-app-bar app dense>
      <v-toolbar-title>Tricking Library</v-toolbar-title>

      <v-spacer/>

      <video-upload/>
    </v-app-bar>
    <v-main>
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import VideoUpload from '../components/video-upload.vue'

export default {
  name: 'DefaultLayout',
  components: {
    VideoUpload
  }
}
</script>
