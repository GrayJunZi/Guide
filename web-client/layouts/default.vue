<template>
  <v-app dark>
    <v-app-bar app dense>
      <v-toolbar-title>Tricking Library</v-toolbar-title>

      <v-spacer/>

      <content-creation-dialog/>
    </v-app-bar>
    <v-main>
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import ContentCreationDialog from '../components/content-creation/content-createion-dialog.vue'

export default {
  name: 'DefaultLayout',
  components: {
    ContentCreationDialog
  }
}
</script>
