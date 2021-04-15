import Vuex from "vuex";
import moment from "moment";

import { auth, db } from "~/plugins/firebase.js";

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: "",
      lotteryRes: "",
      codesRes: "",
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
        // Set the 'capital' field of the city
        cityRef.update({ win: true, winnerCode: payload.ean });
        console.log("doc: " + payload.id + " value set to true");
      },
      markEan(state, payload) {
        const cityRef = db.collection("validEans").doc(payload);
        // Set the 'capital' field of the city
        cityRef.update({ checked: true });
        console.log("EAN: " + payload + " checked set to true");
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

        db.collection("results").onSnapshot(
          (querySnapshot) => {
            console.log(
              `Received query snapshot of size ${querySnapshot.size}`
            );
            // console.log(JSON.stringify(querySnapshot.docs));
            // ...
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );

        db.collection("results")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              const info = doc.data();
              if (info.time.seconds < Date.now() && info.win === false) {
                context.commit("setLast", {
                  id: doc.id,
                  desc: info.desc,
                  time: moment
                    .unix(info.time.seconds)
                    .format("MM/DD/YYYY HH:mm:ss"),
                });
              } else {
                this.last = "no win code";
              }

              lotteryResults.push({
                id: doc.id,
                desc: info.desc,
                time: moment
                  .unix(info.time.seconds)
                  .format("MM/DD/YYYY HH:mm:ss"),
              });
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
              codesResults.push({
                id: doc.id,
                ean: info.ean,
                time: moment
                  .unix(info.created / 1000)
                  .format("MM/DD/YYYY HH:mm:ss"),
              });
            });
            context.commit("setCodes", codesResults);
          });
      },
      getValidEans(context) {
        const validEansResults = [];
        db.collection("validEans")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              const info = doc.data();
              validEansResults.push({
                checked: info.checked,
                ean: info.ean,
                id: doc.id
              });
            });
            context.commit("setValidEans", validEansResults);
          });
      },
    },
  });
};

export default createStore;
