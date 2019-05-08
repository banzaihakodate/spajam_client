<template>
  <v-app>
    <v-toolbar dark color="primary" class="toolbar">
      <v-toolbar-title class="white--text">テストだよ</v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link to="/">
        <v-btn icon>
          <v-icon>home</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/About">
        <v-btn icon>
          <v-icon>info</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-content class="content">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style>
  .toolbar {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  .content {
    height: 90vh;
  }
</style>
