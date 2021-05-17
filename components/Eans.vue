<template>
  <div class="column">
    <div  class="box">
      <h2>
        Checked Eans count:
        {{ validEans.filter((code) => code.checked == true).length }}
      </h2>
      <h2>Valid Eans count: {{ validEans.length }}</h2>
    </div>
    <ImportEans  class="box"/>

    <b-table :data="validEans" :columns="columns"  class="box"></b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ImportEans from "@/components/ImportEans.vue";

import Papaparse from "papaparse";
import { db } from "~/plugins/firebase.js";

export default {
  name: "Eans",
  components: { ImportEans },
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
    ...mapState(["validEans"]),
  },
  mounted() {
    this.getValidEans();
  },
  methods: {
    ...mapActions(["getResults", "getValidEans"]),
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    greet(event) {
      Papaparse.parse(this.dropFiles[0], {
        header: true,
        complete(results) {
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
