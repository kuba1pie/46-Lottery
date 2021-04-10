<template>
  <b-table :data="codesRes" :columns="columns"></b-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Codes",
  layout: "auth",
  data() {
    return {
      columns: [
        {
          field: "ean",
          label: "EAN",
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
