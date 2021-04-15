<template>
  <div class="column">
    <div class="count">
      <h2>
        Checked Eans count:
        {{ validEans.filter((code) => code.checked == true).length }}
      </h2>
      <h2>Valid Eans count: {{ validEans.length }}</h2>
    </div>
    <b-table :data="validEans" :columns="columns"></b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ImportEans",
  layout: "auth",
  data() {
    return {
      eans: [],
      dropFiles: [],
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
  },
};
</script>
