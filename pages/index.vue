<template>
  <section class="section">
    <div class="columns is-mobile">
      <b-field>
        <b-input placeholder="Number" type="number" min="13" max="13">
        </b-input>
      </b-field>
    </div>
    <b-field label="Ean: ">
      <b-input v-model="ean"></b-input>
      <b-button @click="addCode()">Add code</b-button>
    </b-field>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import {  db } from "~/plugins/firebase.js";

export default {
  name: "HomePage",
  data() {
    return {
      ean: "",
    };
  },
  methods: {
    ...mapActions(["addCode"]),
    addCode() {
      db.collection("codes").add({
        ean: this.ean,
      });
    },
  },
};
</script>
