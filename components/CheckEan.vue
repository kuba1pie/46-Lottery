<template>
  <section class="columns is-mobile is-centered check">
    <div class="field has-addons block">
      <div class="control">
        <input
          id="inputEan"
          v-model="ean"
          class="input is-large is-primary"
          :class="inputClass"
          type="text"
          pattern="\d*"
          maxlength="13"
          placeholder="Type your EAN13"
        />
      </div>
      <div class="control is-primary">
        <a class="button is-large" :class="inputClass" @click="addCode()">
          Check your code!
        </a>
      </div>
    </div>
    <div class="status">
      <div v-if="status === 'valid'" id="valid" class="block">
        <article v-if="eanStatus === 'first'" id="first">
          <div v-if="wonStatus === 'won'" id="won" class="message is-primary">
            You won {{ prevWin }}
            <div class="message-body">You won {{ prevWin }}</div>
          </div>
          <div
            v-if="wonStatus === 'loose'"
            id="loose"
            class="message is-danger"
          >
            <div class="message-body">You loose</div>

            You loose
          </div>
        </article>
        <article
          v-if="eanStatus === 'used'"
          id="used"
          class="message is-warning"
        >
          <div class="message-body">EAN already used</div>

          EAN already used
        </article>
      </div>
      <article
        v-if="status === 'invalid'"
        id="invalid"
        class="message is-danger m-6"
      >
        <div class="message-body">Invalid EAN</div>
      </article>
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
            award: this.last,
          });
        };
      }
    }
    return {
      ean: "",
      Item,
      status: "start",
      wonStatus: "",
      eanStatus: "",
    };
  },
  computed: {
    ...mapState(["lotteryRes", "last", "prevWin", "validEans"]),
    inputClass() {
      let className;
      if (this.ean.length !== 13) {
        className = "is-danger";
      } else {
        className = "is-success";
      }
      return className;
    },
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
