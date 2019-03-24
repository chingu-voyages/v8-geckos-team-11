<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span><sub>In</sub><sup>The</sup></span>
        <span class="font-weight-heavy">PAN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="#FAQ">
        <span class="mr-2">FAQ</span>
      </v-btn>
    </v-toolbar>
<!-- Chris has added the two components for the main landing page -->
<!-- Searchbar -->
    <v-content>
      <SearchBar/>
    </v-content>
<!-- Search Results -->
    <v-content>
      <h1 class="text-xs-center">Results grid goes here</h1>
      <!-- <SearchResults/>  Bel will add this later-->
    </v-content>
  </v-app>
</template>

<script>
import SearchBar from './components/SearchBar.vue'

export default {
  components: {
    SearchBar
  }
}
</script>
