import Vuex from "vuex";
import { auth, db } from "~/plugins/firebase.js";

const createStore = () => {
  return new Vuex.Store({
    state: { user: "", lotteryRes: "", codesRes: "" },
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
        state.lotteryRes = payload;
      },
      setCodes(state, payload) {
        state.codesRes = payload;
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
      getResults(context) {
        const lotteryResults = [];
        db.collection("results")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              const info = doc.data();
              lotteryResults.push({ desc: info.desc, time: info.time.seconds });
            });
            context.commit("setResults", lotteryResults);
          });
      },
      getCodes(context) {
        const codesResults = [];
        db.collection("codes")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              const info = doc.data();
              codesResults.push({ ean: info.ean });
            });
            context.commit("setCodes", codesResults);
          });
      },
      addCode(payload) {

        // console.log("Added document with ID: ", res.id);
      },
    },
  });
};

export default createStore;
