import Vuex from "vuex";
import moment from "moment";

import { auth, db } from "~/plugins/firebase.js";

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: "",
      lotteryRes: [],
      codesRes: [],
      last: "loose",
      validEans: [],
    },
    getters: {
      user(state) {
        return state.user;
      },

      isAuthenticated(state) {
        return !!state.user;
      },
      winCodes: (state) => {
        return state.codesRes.filter((code) => code.award !== undefined).length;
      },
      winRes: (state) => {
        return state.lotteryRes.filter((code) => code.win !== undefined).length;
      },
    },

    mutations: {
      setUser(state, payload) {
        state.user = payload;
      },
      setValidEans(state, payload) {
        state.validEans = payload;
      },
      setResults(state, payload) {
        state.lotteryRes = payload;
      },
      setLast(state, payload) {
        state.last = payload;
      },
      setCodes(state, payload) {
        state.codesRes = payload;
      },
      setWin(state, payload) {
        const cityRef = db.collection("results").doc(payload.id);
        cityRef.update({ win: true, winnerCode: payload.ean });
      },
      markEan(state, payload) {
        const cityRef = db.collection("validEans").doc(payload);
        cityRef.update({ checked: true });
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
        db.collection("results").onSnapshot(
          (querySnapshot) => {
            const lotteryResults = [];
            querySnapshot.docs.forEach((doc) => {
              const info = doc.data();
              const item = {
                id: doc.id,
                desc: info.desc,
                win: info.win,
                winnerCode: info.winnerCode,
                time: moment
                  .unix(info.time.seconds)
                  .format("MM/DD/YYYY HH:mm:ss"),
              };
              if (info.time.seconds < Date.now() && info.win === false) {
                context.commit("setLast", item);
              } else {
                this.last = "loose";
              }
              lotteryResults.push(item);
            });
            context.commit("setResults", lotteryResults);
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
      },
      getCodes(context) {
        db.collection("codes").onSnapshot((querySnapshot) => {
          const codesResults = [];
          querySnapshot.docs.forEach((doc) => {
            const info = doc.data();
            codesResults.push({
              id: doc.id,
              ean: info.ean,
              award: info.award.desc,
              time: moment
                .unix(info.created / 1000)
                .format("MM/DD/YYYY HH:mm:ss"),
            });
          });
          context.commit("setCodes", codesResults);
        });
      },
      getValidEans(context) {
        db.collection("validEans").onSnapshot((querySnapshot) => {
          const validEansResults = [];
          querySnapshot.docs.forEach((doc) => {
            const info = doc.data();
            validEansResults.push({
              checked: info.checked,
              ean: info.ean,
              id: doc.id,
            });
          });
          context.commit("setValidEans", validEansResults);
        });
      },
    },
  });
};

export default createStore;
