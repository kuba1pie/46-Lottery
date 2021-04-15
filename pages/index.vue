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
        <div v-if="wonStatus === 'won'" class="columns is-mobile">
          You won {{ last.desc }}
        </div>
        <div v-if="wonStatus === 'loose'" class="columns is-mobile">
          You loose
        </div>
      </div>
      <div v-if="eanStatus === 'used'" class="columns is-mobile">
        EAN already used
      </div>
    </div>
    <div v-if="status === 'invalid'" class="columns is-mobile">Invalid EAN</div>
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
          db.collection("testCodes").add({
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
    checkAward() {
      if (this.last !== "loose") {
        this.wonStatus = "won";
        this.setWin({ id: this.last.id, ean: this.ean });
      } else {
        this.wonStatus = "loose";
      }
    },
    checkEan() {
      const val = this.validEans.filter((e) => e.ean === parseInt(this.ean));
      if (val.length > 0) {
        this.status = "valid";
        if (val[0].checked !== true) {
          this.eanStatus = "first";
          this.checkAward();
          this.markEan(val[0].id);
        } else {
          this.eanStatus = "used";
        }
      } else {
        this.status = "invalid";
      }
    },
    addCode() {
      this.checkEan();

      const code = new this.Item(this.ean, this.last);
      code.send();
    },
  },
};
</script>
