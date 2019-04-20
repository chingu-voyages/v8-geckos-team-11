<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span><sub>In</sub><sup>The</sup></span>
        <span class="font-weight-heavy">PAN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <ShoppingList/>
      <v-btn flat @click="openFaq">
        <span class="mr-2">FAQ</span>
      </v-btn>
    </v-toolbar>
<!-- Chris has added the two components for the main landing page -->
<!-- Searchbar -->
    <v-content>
      <SearchBar/>
<!-- Search Results -->
      <SearchResults/>
    </v-content>
    <v-dialog
      v-model="openFaqDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
     <v-card>
       <v-toolbar card dark color="primary">
          <v-btn icon dark @click="openFaqDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>FAQ</v-toolbar-title>
       </v-toolbar>
       <v-card-text>
         <v-container>
           <v-layout row wrap>
             <v-flex xs12>
               <h2 class="display-3">In the Pan FAQ</h2>
               <div>
                 <p>Here you will find the common answers to top frequently questions</p>
               </div>
             </v-flex>
             <v-flex xs12>
               <h2>Question# 1</h2>
               <div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam,
                   expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</p>
               </div>
             </v-flex>
             <v-flex xs12>
               <h2>Question# 2</h2>
               <div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam,
                    ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</p>
               </div>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
     </v-card>
    </v-dialog>
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
      openFaqDialog: false
    }
  },
  methods: {
    openFaq () {
      this.openFaqDialog = true
    }
  }
}
</script>
