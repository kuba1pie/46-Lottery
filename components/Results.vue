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
      ],
    };
  },
  computed: {
    ...mapState(["lotteryRes", "last"]),
  },
  mounted() {
    this.getResults();
  },
  methods: {
    ...mapActions(["getResults"]),
  },
};
</script>
