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
        <button @click="greet">Greet</button>
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Papa } from "papaparse";
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
    greet(event) {
      // `this` inside methods points to the Vue instance
      // console.log(this.dropFiles[0]);
      Papa.parse(this.dropFiles[0]);
    },
  },
};
</script>
