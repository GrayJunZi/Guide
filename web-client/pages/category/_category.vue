<template>
  <div class="d-flex mt-3 justify-center align-start">
    <div class="mx-2">
      <v-text-field v-model="filter" label="Search" placeholder="e.g. cork, flip, kick ..."
                    prepend-inner-icon="mdi-magnify" outlined/>
      <div v-for="t in filteredTricks">
        {{ t.name }}
      </div>
    </div>
    <v-sheet class="pa-3 mx-2 sticky" v-if="category">
      <div class="text-h6">{{ category.name }}</div>
      <v-divider class="my-1"/>
      <div class="text-body-2">{{ category.description }}</div>
    </v-sheet>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "_category",
  data: () => ({
    category: null,
    tricks: [],
    filter: ""
  }),
  computed: {
    ...mapGetters('tricks', ['categoryById']),
    filteredTricks() {
      if (!this.filter)
        return this.tricks;
      const normalize = this.filter.trim().toLowerCase()
      return this.tricks.filter(x => x.name.toLowerCase().includes(normalize) || x.description.toLowerCase().includes(normalize))
    }
  },
  async fetch() {
    const categoryId = this.$route.params.category;
    this.category = this.categoryById(categoryId)
    this.tricks = await this.$axios.$get(`/api/categories/${categoryId}/tricks`)
  },
  // head() {
  //   if (!this.category) return {}
  //   return {
  //     title: this.category.name,
  //     meta: {
  //       hid: 'description',
  //       name: 'description',
  //       content: this.category.description
  //     }
  //   }
  // }
}
</script>
