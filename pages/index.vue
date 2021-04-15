<template>
  <section class="section">
    <div class="columns is-mobile">
      <b-field label="Ean: ">
        <b-input v-model="ean"></b-input>
        <b-button @click="addCode()">Add code</b-button>
      </b-field>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import moment from "moment";

import { db } from "~/plugins/firebase.js";

export default {
  name: "HomePage",
  data() {
    class Item {
      constructor(ean, closest) {
        this.ean = parseInt(ean);
        this.created = Date.now();
        this.closest = closest;
        this.send = function () {
          db.collection("testCodes").add({
            ean: this.ean,
            created: this.created,
            closest: this.closest,
          });
        };
      }
    }
    return {
      ean: null,
      Item,
    };
  },
  computed: {
    ...mapState(["lotteryRes"]),
  },
  mounted() {
    this.getResults();
  },
  methods: {
    ...mapActions(["addCode", "getResults"]),

    addCode() {
      const counts = this.lotteryRes;
      const goal = this.ean;

      const closest = counts.reduce(function (prev, curr) {
        return curr.time - goal.time < prev.time - goal.time
          ? curr
          : prev;
      });

      console.log(closest);
      const code = new this.Item(this.ean, closest);
      code.send();
    },
  },
};
</script>
