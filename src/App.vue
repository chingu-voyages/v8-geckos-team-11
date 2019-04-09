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
<!-- Filter -->
      <Filter/>
<!-- Search Results -->
      <SearchResults/>
    </v-content>
  </v-app>
</template>

<script>
import SearchResults from './components/SearchResults'
import SearchBar from './components/SearchBar'
import Filter from './components/Filter'

export default {
  components: {
    SearchBar,
    SearchResults,
    Filter
  }
}
</script>
