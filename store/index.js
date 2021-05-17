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
      prevWin: "",
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
      setPrevWin(state, payload) {
        state.prevWin = payload;
      },
      setWin(state, payload) {
        const cityRef = db.collection("results").doc(payload.id);
        cityRef.update({
          win: true,
          winnerCode: payload.ean,
          winDate: Date.now(),
        });
      },
      markEan(state, payload) {
        const cityRef = db.collection("validEans").doc(payload);
        cityRef.update({ checked: true, checkedTime: Date.now() });
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
        db.collection("results")
          .orderBy("time", "asc")
          .onSnapshot(
            (querySnapshot) => {
              const lotteryResults = [];
              querySnapshot.docs.forEach((doc) => {
                const info = doc.data();
                const item = {
                  id: doc.id,
                  desc: info.desc,
                  // win: info.win,
                  winnerCode: info.winnerCode,
                  time: null,
                };
                if (info.time) {
                  const date = info.time;
                  item.time = moment.unix(date).format("MM/DD/YYYY HH:mm:ss");
                  if (info.time * 1000 < Date.now()) {
                    if (info.win == null) {
                      context.commit("setLast", item.desc);
                    }
                  }
                }
                lotteryResults.push(item);
              });
              context.commit("setResults", lotteryResults);
            },
            (err) => {
              // eslint-disable-next-line no-console
              console.log(`Encountered error: ${err}`);
            }
          );
      },
      getCodes(context) {
        db.collection("codes")
          .orderBy("created", "desc")
          .onSnapshot((querySnapshot) => {
            const codesResults = [];
            querySnapshot.docs.forEach((doc) => {
              const info = doc.data();

              const dat = {
                id: doc.id,
                ean: info.ean,
                award: info.award,
                time: moment
                  .unix(info.created / 1000)
                  .format("MM/DD/YYYY HH:mm:ss"),
              };
              codesResults.push(dat);
            });
            context.commit("setCodes", codesResults);
          });
      },
      getValidEans(context) {
        db.collection("validEans")
          .orderBy("ean", "asc")
          .onSnapshot((querySnapshot) => {
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
