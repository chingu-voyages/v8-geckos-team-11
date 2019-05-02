<template>
  <v-dialog
      v-model="openFaqDialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
      color="blue"
    >
    <template v-slot:activator="{ on }">
        <v-btn
          flat
          v-on="on"
        >
          FAQ
        </v-btn>
      </template>
     <v-card>
       <v-toolbar dark color="primary" card>
          <v-btn icon dark @click="openFaqDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>FAQ</v-toolbar-title>
       </v-toolbar>
       <v-card-text>
         <v-container>
           <v-layout row wrap>
             <v-flex xs12>
               <h2 class="display-2">In the Pan FAQ</h2>
               <div>
                 <p>Here you will find the common answers to top frequently questions</p>
               </div>
             </v-flex>
             <v-flex xs12 v-for="(q, index) in faq.faq" :key="index">
               <h3>{{q.q}}</h3>
               <div>
                 <p>{{q.a}}</p>
               </div>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
     </v-card>
    </v-dialog>
</template>
<script>
import faq from '../faq/questions'
export default {
  data () {
    return {
      openFaqDialog: false,
      faq: faq
    }
  }
}
</script>
