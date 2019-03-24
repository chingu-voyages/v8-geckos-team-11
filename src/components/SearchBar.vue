<template>
  <v-form
    ref='form'
    v-model='valid'
    lazy-validation
  >
    <v-text-field
      v-model='query'
      label='whats for dinner?'
      required
    />
    <v-btn @click='search'>Search</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    query: ''
  }),

  methods: {
    search () {
      // we can add validation later
      // if (this.$refs.form.validate()) {
      //   this.snackbar = true
      // }
      this.$store.dispatch('callApi', this.query) // this will call the action to get data from api
    }
  }
}
</script>
