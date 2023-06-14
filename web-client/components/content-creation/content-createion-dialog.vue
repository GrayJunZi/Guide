<template>
  <v-dialog :value="active" persistent width="600">
    <template v-slot:activator="{on}">
      <v-menu offset-y>
        <template v-slot:activator="{on,attrs}">
          <v-btn depressed v-bind="attrs" v-on="on">
            Create
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in menuItems" :key="`ccd-menu-${index}`"
                       @click="activate({component:item.component})">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <div v-if="component">
      <component :is="component"></component>
    </div>

    <div class="d-flex justify-center my-4">
      <v-btn @click="reset">Close</v-btn>
    </div>
  </v-dialog>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import TrickSteps from './trick-steps.vue'
import SubmissionSteps from './submission-steps.vue'
import CategoryForm from './category-form.vue'
import DifficultyForm from './difficulty-form.vue'

export default {
  name: 'content-creation-dialog',
  components: {
    TrickSteps,
    SubmissionSteps,
    CategoryForm,
    DifficultyForm
  },
  data: () => ({
    trickName: "",
    submission: ""
  }),
  computed: {
    ...mapState('video-upload', ['active', 'component']),
    menuItems() {
      return [
        {component: TrickSteps, title: 'Trick'},
        {component: SubmissionSteps, title: 'Submission'},
        {component: CategoryForm, title: 'Category'},
        {component: DifficultyForm, title: 'Difficulty'},
      ]
    }
  },
  methods: {
    ...mapMutations('video-upload', ['reset', 'activate']),
  }
}
</script>

