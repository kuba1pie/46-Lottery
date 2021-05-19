<template>
  <section class="columns is-mobile is-centered">
    <div class="field has-addons">
      <div class="control">
        <input
          id="inputEan"
          v-model="ean"
          class="input is-large"
          :class="eanLength == 13 ? 'is-success' : 'is-danger'"
          type="text"
          placeholder="Type your ean"
        />
      </div>
      <div class="control">
        <a class="button is-large is-info" @click="addCode()">
          Check your code!
        </a>
      </div>
    </div>
    <div v-if="status === 'valid'" id="valid">
      <div v-if="eanStatus === 'first'" id="first">
        <div v-if="wonStatus === 'won'" id="won">You won {{ prevWin }}</div>
        <div v-if="wonStatus === 'loose'" id="loose">You loose</div>
      </div>
      <div v-if="eanStatus === 'used'" id="used">EAN already used</div>
    </div>
    <div v-if="status === 'invalid'" id="invalid">Invalid EAN</div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { db } from "~/plugins/firebase.js";
export default {
  name: "HomePage",
  data() {
    class Item {
      constructor(ean, award) {
        this.ean = parseInt(ean);
        this.created = Date.now();
        this.award = award;
        this.send = function () {
          db.collection("codes").add({
            ean: this.ean,
            created: this.created,
            award: this.last,
          });
        };
      }
    }
    return {
      ean: null,
      Item,
      status: "start",
      wonStatus: "",
      eanStatus: "",
    };
  },
  computed: {
    ...mapState(["lotteryRes", "last", "prevWin", "validEans"]),
    a => (a < 10) ? 'valid' : 'invalid'
  },
  mounted() {
    this.getResults();
    this.getValidEans();
  },
  methods: {
    ...mapActions(["addCode", "getResults", "getValidEans"]),
    ...mapMutations(["setWin", "setPrevWin", "markEan"]),

    addCode() {
      console.log("add");
      this.checkEan();
      // eslint-disable-next-line no-unused-vars
      db.collection("codes").add({
        ean: this.ean,
        created: Date.now(),
        award: this.last,
      });
    },
    checkEan() {
      console.log("check");

      const val = this.validEans.filter((e) => e.ean === parseInt(this.ean));
      if (val.length > 0) {
        this.status = "valid";
        console.log("valid");

        this.checkIfUsed(val[0]);
      } else {
        this.status = "invalid";
        console.log("invalid");
      }
    },
    checkIfUsed(ean) {
      console.log(ean);
      console.log("checkIfUsed");
      const item = ean.checked;
      if (item !== true) {
        this.eanStatus = "first";
        console.log("first");
        console.log("mark ean as checked " + this.ean);
        this.markEan(ean.id);
        this.checkAward(ean);
      } else {
        console.log("used");
        this.eanStatus = "used";
      }
    },
    checkAward(ean) {
      console.log("checkAward");
      console.log("this.last: " + this.last);
      if (this.last !== "loose") {
        console.log("win");

        this.wonStatus = "won";
        this.setWin({ id: this.last.id, ean: this.ean });
        this.setPrevWin(this.last);
      } else {
        console.log("loose");

        this.wonStatus = "loose";
      }
    },
  },
};
</script>
<style lang="css">
.field {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
