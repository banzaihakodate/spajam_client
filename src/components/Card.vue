<template>
  <v-card>
    <v-layout>
      <v-flex xs10>
        <v-card-title>
          <v-icon>person</v-icon>
          <div class="pl-3">
          {{name}}
          </div>
        </v-card-title>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    name: "card",
    props: {
      name: String,
    },
    methods: {
    },
  }
</script>

<style scoped>
</style>
