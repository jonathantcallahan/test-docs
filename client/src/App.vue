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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
