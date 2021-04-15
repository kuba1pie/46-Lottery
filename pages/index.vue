<template>
  <section class="section">
    <div v-if="status === 'start'" class="columns is-mobile">
      <b-field label="Ean: ">
        <b-input v-model="ean"></b-input>
        <b-button @click="addCode()">Add code</b-button>
      </b-field>
    </div>
    <div v-if="status === 'valid'" class="columns is-mobile">
      <div v-if="eanStatus === 'first'" class="columns is-mobile">
        <div v-if="wonStatus === 'won'" class="is-info columns is-mobile">
          You won {{ last.desc }}
        </div>
        <div v-if="wonStatus === 'loose'" class="is-danger columns is-mobile">
          You loose
        </div>
      </div>
      <div v-if="eanStatus === 'used'" class="columns is-mobile">
        EAN already used
      </div>
    </div>
    <div v-if="status === 'invalid'" class="is-warning columns">
      Invalid EAN
    </div>
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
      const item=ean.checked
      if (item !== true) {
        this.eanStatus = "first";
        this.markEan(item);
        this.checkAward();
      } else {
        this.eanStatus = "used";
      }
    },
    checkAward() {
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
