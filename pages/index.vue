<template>
  <div class="column container">
    <b-field v-if="status === 'start'">
      <b-input v-model="ean"></b-input>
      <b-button @click="addCode()">Add code</b-button>
    </b-field>
    <div v-if="status === 'valid'">
      <div v-if="eanStatus === 'first'">
        <div v-if="wonStatus === 'won'">You won {{ last.desc }}</div>
        <div v-if="wonStatus === 'loose'">You loose</div>
      </div>
      <div v-if="eanStatus === 'used'">EAN already used</div>
    </div>
    <div v-if="status === 'invalid'">Invalid EAN</div>
  </div>
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
            award: this.award,
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
    ...mapState(["lotteryRes", "last", "validEans"]),
  },
  mounted() {
    this.getResults();
    this.getValidEans();
  },
  methods: {
    ...mapActions(["addCode", "getResults", "getValidEans"]),
    ...mapMutations(["setWin", "markEan"]),

    addCode() {
      console.log("add");
      this.checkEan();
      const code = new this.Item(this.ean, this.last);
      code.send();
    },
    checkEan() {
      const val = this.validEans.filter((e) => e.ean === parseInt(this.ean));
      if (val.length > 0) {
        this.status = "valid";
        this.checkIfUsed(val[0]);
      } else {
        this.status = "invalid";
      }
    },
    checkIfUsed(ean) {
      console.log(ean)
      console.log(ean.win)
      const item = ean.win;
      if (item !== true) {
        this.eanStatus = "first";
        console.log("mark ean as checked " + this.ean);
        this.markEan(ean.id);
        this.checkAward(ean);
      } else {
        this.eanStatus = "used";
      }
    },
    checkAward(ean) {
      if (this.last !== "loose") {
        this.wonStatus = "won";
        this.setWin({ id: this.last.id, ean: this.ean });
      } else {
        this.wonStatus = "loose";
      }
    },
  },
};
</script>
<style lang="css">
nav span a,
input {
  padding: 2em;
}
.sc {
  padding: 2em auto;
}
</style>
