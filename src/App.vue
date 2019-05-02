<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-toolbar-side-icon class="hidden-md-and-up" @click="$refs.drawer.drawer = !$refs.drawer.drawer"></v-toolbar-side-icon>
        <span @click="reloadPage" class="logo">In The PAN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <About/>
      </div>
       <div class="hidden-sm-and-down">
        <Faq/>
      </div>
      <div class="hidden-sm-and-down">
        <ShoppingList/>
      </div>
    </v-toolbar>
    <v-content>
      <SearchBar/>
      <SearchResults ref="drawer"/>
    </v-content>
  </v-app>
</template>
<script>
import SearchResults from './components/SearchResults'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'
import About from './components/About'
import Faq from './components/Faq'
export default {
  components: {
    SearchBar,
    SearchResults,
    ShoppingList,
    Faq,
    About
  },
  data () {
    return {
      drawer: false
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
.hidden-sm-and-down {
  padding: 10px;
}
.logo {
  cursor: pointer;
}
.soft-peach {
  color: #EEDFDE;
}

.fountain-blue {
  color: #65ADB2;
}

.emerald {
  color: #50C878;
}

.falcon {
  color: #6F5659;
}

.steel-gray {
  color: #7A7F80;
}
</style>
