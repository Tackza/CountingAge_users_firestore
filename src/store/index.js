import Vue from "vue";
import Vuex from "vuex";
import firebaseInstance from "../../firebaseInstance";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    userName: null,
    items: [],
  },
  mutations: {
    SET_USER(state, dataLogin) {
      console.log(dataLogin);
      state.userId = dataLogin.pinId;
      state.userName = dataLogin.name;
    },
    LOGOUT(state) {
      state.userId = "";
    },
    PUSH_DATA_PERSON(state, resultData) {
      state.items.push(resultData);
    },

    INSERT_DATA_PERSON(state, resultData) {
      state.items = resultData;
    },
    DELETE_DATA_PERSON(state, id) {
      const result = state.items.filter((data) => data.id !== id);
      state.items = result;
    },
    UPDATE_DATA_PERSON(state, dataDb) {
      state.items.map((item) => {
        if (item.id === dataDb.id) {
          item = dataDb;
        }
      });
    },
  },
  actions: {
    async init({ dispatch }, pin) {
      await dispatch("login", pin);
      await dispatch("fetchData");
    },
    async login({ commit }, pin) {
      try {
        const response = await firebaseInstance.firestore
          .collection("User")
          .where("pin", "==", pin)
          .get();
        const userPin = response.docs.map((doc) => {
          return doc.data();
        });
        const dataLogin = {
          pinId: userPin[0].userId,
          name: userPin[0].name,
        };
        commit("SET_USER", dataLogin);
      } catch (err) {
        return Promise.reject(new Error("error"));
      }
    },

    logout() {
      this.commit("LOGOUT");
    },

    async fetchData({ commit }) {
      let result = await firebaseInstance.firestore
        .collection("Persons")
        .where("userId", "==", this.state.userId)
        .get();
      let resultData = result.docs.map((doc) => doc.data());

      commit("INSERT_DATA_PERSON", resultData);
    },

    async insertData({ commit }, data) {
      const resultData = {
        name: data.name,
        birthDate: data.birthDate,
        id: data.id,
        row: Date(),
        userId: this.state.userId,
      };
      console.log(resultData);
      await firebaseInstance.firestore
        .collection("Persons")
        .doc(this.state.userName + " - " + data.id.toString())
        .set(resultData);
      commit("PUSH_DATA_PERSON", resultData);
    },

    async deleteData({ commit }, item) {
      console.log(item.id);
      await firebaseInstance.firestore
        .collection("Persons")
        .doc(this.state.userName + " - " + item.id.toString())
        .delete();
      commit("DELETE_DATA_PERSON", item.id);
    },

    async updateData({ commit }, data) {
      await firebaseInstance.firestore
        .collection("Persons")
        .doc(this.state.userName + " - " + data.id.toString())
        .update({
          name: data.name,
          birthDate: data.age,
        });

      const dataDb = await firebaseInstance.firestore
        .collection("Persons")
        .doc(this.state.userName + " - " + data.id.toString())
        .get();

      commit("UPDATE_DATA_PERSON", dataDb.data());
    },
  },
  getters: {
    showAge(state) {
      return state.items;
    },
    showUsername(state) {
      return state.userName;
    },
  },
});
