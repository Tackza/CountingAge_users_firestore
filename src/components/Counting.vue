<template>
  <div class="hello">
    <div class="container">
      <form class="form" @submit.prevent="ageData">
        <div>
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="Enter name"
            v-model="name"
          />
        </div>
        <div>
          <input
            class="form-control"
            type="text"
            placeholder="Enter birthday"
            v-model="age"
          />
        </div>
        <button type="submit">confirm</button>
      </form>
    </div>
    <div>
      <ul>
        <li v-for="(person, index) of listPersonsAge" :key="index">
          <button @click="updateData">Edit</button>
          <button class="btn btn-danger" @click="deleteData(person)">
            Del
          </button>
          Name : {{ person.name }} BirthDay : {{ person.birthDate }} CurrentAge
          : {{ person.birthDate | calBirthDate }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { v1 as uuid } from "uuid";
import moment from "moment";
export default {
  data() {
    return {
      name: null,
      age: null,
    };
  },

  mounted() {
    this.checkUserId()
    this.fetchData();
  },
  computed: {
    listPersonsAge() {
      return this.$store.getters["showAge"];
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchData");
    },
    ageData() {
      const detailPerson = {
        name: this.name,
        birthDate: this.age,
        id: uuid(),
      };
      this.$store.dispatch("insertData", detailPerson);
      (this.name = "")((this.age = ""));
    },
    deleteData(item) {
      this.$store.dispatch("deleteData", item);
    },
    updateData(id) {
      const dataPerson = {
        name: this.name,
        age: this.age,
      };
      this.$store.dispatch("updateData", id, dataPerson);
    },
    checkUserId() {
      if ((!this.$store.state.userId)) {
        this.$router.push({ name: "login" });
      }
    },
  },
  filters: {
    calBirthDate: function (value) {
      const m = moment(value.toString(), "DD/MM/YYYY");
      const years = moment().diff(m, "years", false);
      const month = moment().diff(m.add(years, "years"), "month", false);
      const days = moment().diff(m.add(month, "months"), "days", false);
      return years + " years, " + month + " months " + days + " days";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: center;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
