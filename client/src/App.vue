<template>
  <div id="app">
    <list-of-tests></list-of-tests>
  </div>
</template>

<script>
import ListOfTests from './components/ListOfTests.vue'

export default {
  name: 'app',
  components: {
    'list-of-tests': ListOfTests
  }
}
</script>

<style>
#app {
  font-family: arial
}
</style>
