<template>
  <div class="column">
    <h1>Import</h1>
    <div id="form">
      <b-field class="file">
        <b-upload v-model="file" expanded>
          <a class="button is-primary is-fullwidth">
            <b-icon icon="upload"></b-icon>
            <span>{{ file.name || "Click to upload" }}</span>
          </a>
        </b-upload>
      </b-field>
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Papaparse from "papaparse";
import { db } from "~/plugins/firebase.js";
export default {
  name: "ImportFile",
  layout: "auth",
  data() {
    return {
      file: {},
      dropFiles: [],
      columns: [
        {
          field: "desc",
          label: "Desc",
          width: "80",
        },
        {
          field: "time",
          label: "Time",
        },
      ],
    };
  },
  computed: {
    ...mapState(["lotteryRes"]),
  },
  mounted() {
    this.getResults();
  },
  methods: {
    ...mapActions(["getResults"]),
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    putAward(item) {
      db.collection("results").add({
        ean: item.ean,
        desc: item.desc,
      });
    },
    greet(event) {
      Papaparse.parse(this.dropFiles[0], {
        header: true,
        complete(results) {
          results.data.forEach((element) =>
            db.collection("results").add({
              time: element.time,
              desc: element.desc,
            })
          );
        },
      });
    },
  },
};
</script>
