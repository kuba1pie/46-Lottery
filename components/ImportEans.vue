<template>
  <div class="column">
    <div class="count">
      <h2>
        Checked Eans count:
        {{ validEans.filter((code) => code.checked == true).length }}
      </h2>
      <h2>Valid Eans count: {{ validEans.length }}</h2>
      <b-field>
        <b-upload v-model="dropFiles" multiple drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <b-button @click="greet">Upload</b-button>
    </div>
    <b-table :data="validEans" :columns="columns"></b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Papaparse from "papaparse";
import { db } from "~/plugins/firebase.js";

export default {
  name: "ImportEans",
  layout: "auth",
  data() {
    return {
      eans: [],
      dropFiles: [],
      file: {},
      columns: [
        {
          field: "ean",
          label: "EAN",
        },
        {
          field: "checked",
          label: "checked",
        },
      ],
    };
  },
  computed: {
    ...mapState(["lotteryRes", "validEans"]),
  },
  mounted() {
    this.getValidEans();
  },
  methods: {
    ...mapActions(["getResults", "getValidEans"]),
    // ...mapMutations(["setValidEans"]),
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    greet(event) {
      // `this` inside methods points to the Vue instance
      // console.log(this.dropFiles[0]);
      Papaparse.parse(this.dropFiles[0], {
        header: true,
        complete(results) {
          console.log(results.data);
          results.data.forEach((element) =>
            db.collection("validEans").add({
              ean: element.ean,
            })
          );
        },
      });
    },
  },
};
</script>
