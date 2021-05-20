<template>
  <div class="column">
    <h1>Import Prizes from .csv file</h1>
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
            <p>Drop your Prize file or click to upload</p>
            <p>Upload Button disabled in preview</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <b-field>
      <b-button v-if="$store.state.user !== null" class="button" @click="upload"
        >Upload</b-button
      >
      <b-button
        v-if="$store.state.user === null"
        class="button is-info is-large"
        >Upload</b-button
      >
    </b-field>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Papaparse from "papaparse";
import { db } from "~/plugins/firebase.js";
export default {
  name: "ImportPrizes",
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
  methods: {
    ...mapActions(["getResults"]),
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    upload() {
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
<style>
.button {
  background-color: #ba1414;
}
</style>
