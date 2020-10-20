<template>
  <div class="home">
    <Counting />
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
