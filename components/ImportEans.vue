<template>
  <div class="column">
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
          field: "won",
          label: "Won",
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
