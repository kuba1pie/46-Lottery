import Vuex from "vuex";
import { auth, db } from "~/plugins/firebase.js";
const resultsRef = db.collection("codes");

const createStore = () => {
  return new Vuex.Store({
    state: { user: "", results: "" },

    getters: {
      user(state) {
        return state.user;
      },

      isAuthenticated(state) {
        return !!state.user;
      },
    },

    mutations: {
      setUser(state, payload) {
        state.user = payload;
      },
      setResults(state, payload) {
        state.results = payload;
      },
    },

    actions: {
      signUp({ commit }, { email, password }) {
        return auth.createUserWithEmailAndPassword(email, password);
      },

      signInWithEmail({ commit }, { email, password }) {
        return auth.signInWithEmailAndPassword(email, password);
      },

      signOut() {
        return auth.signOut();
      },
      getResults() {
        resultsRef.doc("SF").set({
          name: "San Francisco",
          state: "CA",
          country: "USA",
          capital: false,
          population: 860000,
          regions: ["west_coast", "norcal"],
        });
      },
      getResults2() {
        db.collection("codes")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              const info = doc.data();
              console.log(info.ean);
            });          });
      },
    },
  });
};

export default createStore;
