<template>
  <v-card>
    <v-card-title>Create Category</v-card-title>
    <v-card-text>
      <v-text-field label="Name" v-model="form.name"/>
      <v-text-field label="Description" v-model="form.description"/>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import {mapGetters} from 'vuex'

const initState = () => ({
  form: {
    id: "",
    name: "",
    description: "",
    tricks: []
  },
})

export default {
  name: 'category-form',
  data: initState,
  computed: {
    ...mapGetters('tricks', ['categoryItems'])
  },
  methods: {
    save() {
      this.$axios.$post('/api/categories', this.form)
    }
  }
}
</script>
