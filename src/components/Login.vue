<template>
  <div class="col-md-4 offset-md-4"> 
    <form @submit.prevent="login">
      <label for="">Pin ID :</label>
      <div class="input-group mb-3">
        <input
          type="text"
          ref="pin"
          class="form-control"
          aria-describedby="button-addon2"
          v-model="pin"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Login
          </button>
        </div>
      </div>
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
  mounted () {
    this.$refs['pin'].focus();
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