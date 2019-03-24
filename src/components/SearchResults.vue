<template>
  <v-container grid-list-x1>
    <v-layout fluid row wrap>
      <v-flex lg6 sm12>
        <div class="card-container">
          <v-card class="u-clearfix">
            <div class="card-body">
              <v-card-title>
                <div class="headline">New Brunch Recipe</div>
                <span class="card-author subtle">John Smith</span>
              </v-card-title>
              <v-card-text class="card-description subtle">
                <ul>
                  <li><v-icon >person</v-icon><span>1</span></li>
                  <li><v-icon>timer</v-icon><span>15 min</span></li>
                </ul>
                Eiusmod enim consequat laborum voluptate
                quis ad. Ex dolor consequat do voluptate pariatur
                aute. Minim fugiat dolor sit non officia tempor
                tempor quis amet culpa fugiat excepteur magna.
                Laboris laborum culpa enim officia pariatur labore
                nisi proident do culpa adipisicing anim occaecat.
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="orange">Read More</v-btn>
              </v-card-actions>
            </div>
            <v-img height="380px" src="https://i.pinimg.com/originals/52/75/cc/5275ccbd916d70596808c04a600679d8.jpg"></v-img>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    result: Object,
    error: String,
    showError: Boolean,
    icon: String
  },
  data () {
    return {
      data: ''
    }
  }
}
</script>
<style scoped>
html {
  background: #FAF7F2;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.u-clearfix:before,
.u-clearfix:after {
  content: " ";
  display: table;
}

.u-clearfix:after {
  clear: both;
}

.u-clearfix {
  *zoom: 1;
}

.subtle {
  color: #aaa;
}

.card-container {
  margin: 25px auto 0;
  position: relative;
  width: 692px;
}

.v-card {
  background-color: #fff;
  padding: 30px;
  position: relative;
  max-height: 440px;
}

.card-body {
  display: inline-block;
  float: left;
  padding-right: 20px;
  width: 310px;
}

.card-author {
  display: block;
  font-size: 12px;
  letter-spacing: .5px;
  text-transform: uppercase;
}

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

.v-card-title {
  font-family: serif;
  font-size: 60px;
  font-weight: 300;
  line-height: 60px;
  margin: 10px 0;
}

.v-card-text {
  display: inline-block;
  font-weight: 300;
  line-height: 22px;
  margin: 10px 0;
}

.v-img {
  float: right;
}
</style>
