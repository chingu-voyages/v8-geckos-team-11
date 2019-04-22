<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
        <span @click="reloadPage" class="logo">In The PAN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <ShoppingList/>
      </div>
      <v-btn flat href="#FAQ">
        <span class="mr-2">FAQ</span>
      </v-btn>
    </v-toolbar>
<!-- Chris has added the two components for the main landing page -->
<!-- Searchbar -->
    <v-content>
      <SearchBar/>
<!-- Search Results -->
      <SearchResults :drawer="this.drawer"/>
    </v-content>
  </v-app>
</template>
<script>
import SearchResults from './components/SearchResults'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'

export default {
  components: {
    SearchBar,
    SearchResults,
    ShoppingList
  },
  data () {
    return {
      drawer: false
    }
  },
  watch: {
    '$vuetify.breakpoint.mdAndUp' () {
      this.drawer = false
    }
  },
  methods: {
    reloadPage () {
      location.reload()
    }
  }
}

</script>
<style>
.logo {
  cursor: pointer;
}
</style>
