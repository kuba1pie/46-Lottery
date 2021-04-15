<template>
  <scetion>
    <b-table :data="codesRes" :columns="columns"></b-table>
  </scetion>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Codes",
  layout: "auth",
  data() {
    return {
      ean: "",
      columns: [
        {
          field: "ean",
          label: "EAN",
        },
        {
          field: "time",
          label: "Time",
        },
        {
          field: "award",
          label: "Result",
        },
      ],
    };
  },

  computed: {
    ...mapState(["codesRes"]),
  },
  mounted() {
    this.getCodes();
  },
  methods: {
    ...mapActions(["getCodes"]),

  },
};
</script>
