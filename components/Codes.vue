<template>
  <section>
    <div class="box box-styled">
      <h2>Winner codes: {{ winCodes }}</h2>
      <h2>Checked codes: {{ codesRes.length }}</h2>
    </div>
    <b-table :data="codesRes" :columns="columns" class="box"></b-table>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

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
    ...mapGetters(["winCodes"]),
  },
  mounted() {
    this.getCodes();
  },
  methods: {
    ...mapActions(["getCodes"]),
  },
};
</script>
