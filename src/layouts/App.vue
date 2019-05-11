<template>
  <v-app>
    <v-content class="content">
      <transition mode='out-in'>
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<style>
  .content {
    height: 90vh;
  }

  .v-enter {
    transform: translate(100%, 0);
  }
  .v-enter-active {
    transition: all 1s 0s ease;
  }
  .v-leave {
    transform: translate(0, 0);
  }
  .v-leave-to {
    transform: translate(-100%, 0);
  }
  .v-leave-active {
    transition: all 1.2s 0s ease;
  }
</style>
