<template>
  <div>
    <nav class="navbar navbar-light bg-dark">
      <div class="col"></div>
      <div class="col text-white">{{ userName }}'s Counting Age</div>
      <div class="col text-right">
        <button class="btn" @click="logout">
          <i class="fas fa-power-off text-white" ></i>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$store.getters["showUsername"];
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
};
</script>

<style>
</style>