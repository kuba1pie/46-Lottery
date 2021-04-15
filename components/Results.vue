<template>
  <div class="Results">
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
