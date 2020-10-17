<template>
  <div>
    <form @submit.prevent="login">
      <label for="">Pin ID :</label>
      <input type="text" v-model="pin" />
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pin: null,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("init", this.pin)
        .then(() => {
          this.$router.push({ name: "counting" });
        })
        .catch(() => {
          console.log("is not pin login");
        });
    },
  },
};
</script>