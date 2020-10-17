<template>
  <div class="home">
    <Counting msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Counting from '@/components/Counting.vue'

export default {
  name: 'Home',
  components: {
    Counting
  }
}
</script>
