v<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://www.edamam.com/web-img/efe/efe1546ab8593aaa62ed4fac11838f35.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Recipe Title</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
                <ul class="icon">
                  <li><v-icon >person</v-icon><span>1</span></li>
                  <li><v-icon>timer</v-icon><span>2 min</span></li>
                </ul>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Read More</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
li {
  display: inline-block;
  margin-left: 1em;
  line-height: 1em;
}

li:first-child {
  margin-left: 0;
}

li span {
  margin-left: 7px;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
