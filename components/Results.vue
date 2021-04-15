<template>
  <div class="Results">
    <div class="count">
      <h2>
        Winner codes:
        {{ lotteryRes.filter((code) => code.win !== undefined).length }}
      </h2>
      <h2>Checked codes: {{ lotteryRes.length }}</h2>
    </div>
    <b-table :data="lotteryRes" :columns="columns"></b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Results",
  layout: "auth",
  data() {
    return {
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
        {
          field: "win",
          label: "Win",
        },
        {
          field: "winnerCode",
          label: "Win",
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
  },
};
</script>
