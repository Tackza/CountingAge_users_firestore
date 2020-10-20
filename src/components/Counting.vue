<template>
  <div class="hello">
    <Header />
    <div class="container mt-4">
      <form class="form" @submit.prevent="ageData">
        <div class="row col-md-10 offset-md-1 mb-5 border border-info p-4">
          <div class="col">
            <input
              class="form-control"
              type="text"
              placeholder="Enter name"
              v-model="name"
            />
          </div>
          <div class="col">
            <input
              class="form-control"
              type="text"
              placeholder="ex. 01/10/2000"
              v-model="age"
            />
          </div>

          <div class="col-md-auto">
            <button class="btn btn-primary" type="submit">Confirm</button>
          </div>
        </div>
      </form>
    </div>
    <div class="row justify-content-md-center">
      <ul class="list-group">
        <li
          class="list-group-item mt-2"
          v-for="(person, index) of listPersonsAge"
          :key="index"
        >
          <div class="col">
            <div>Name : {{ person.name }}</div>

            <div>
              <span
                >BirthDay :
                {{ person.birthDate }}
              </span>
            </div>
          </div>

          <div class="col">
            {{ person.birthDate | calBirthDate }}
          </div>

          <div class="col-md-auto">
            <button
              type="button"
              class="btn"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              <i class="far fa-edit"></i>
            </button>
            <button class="btn btn-c" @click="deleteData(person)">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>

          <!-- Modal -->

          <div
            class="modal fade"
            id="staticBackdrop"
            data-backdrop="static"
            data-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <!-- input modal -->
                <div class="modal-body">
                  <div class="col">
                    <label>Name : </label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Enter name"
                      v-model="updateTask.name"
                    />
                  </div>
                  <div class="col mt-3">
                    <label>BirthDay : </label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="ex. 01/10/2000"
                      v-model="updateTask.age"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="updateData(person)"
                    data-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { v1 as uuid } from "uuid";
import moment from "moment";
import Header from "./Header";
export default {
  data() {
    return {
      updateTask: {
        name: null,
        age: null,
      },
      id: null,
      name: null,
      age: null,
    };
  },
  components: {
    Header,
  },
  updated() {
    this.fetchData();
  },

  mounted() {
    this.checkUserId();
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

    updateData(item) {
      const data = {
        name: this.updateTask.name,
        age: this.updateTask.age,
        id: item.id,
      };
      this.$store.dispatch("updateData", data);
    },
    checkUserId() {
      if (!this.$store.state.userId) {
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
#nav {
  padding: 0px 30px;
}

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
.btn-c {
  font-size: 20px;
}
.view {
  border-color: transparent;
  background-color: initial;
  color: initial;
}
</style>
