<template>
  <div id="Prizes" class="Results Prizes">
    <div  class="box box-styled">
      <h2>
        Winner codes:
        {{ lotteryRes.filter((code) => code.winnerCode !== undefined).length }}
      </h2>
      <h2>Checked codes: {{ lotteryRes.length }}</h2>
    </div>
    <ImportPrizes  class="box"/>
    <b-table :data="lotteryRes" :columns="columns"  class="box"></b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ImportPrizes from "@/components/ImportPrizes.vue";

export default {
  name: "Results",
  components: { ImportPrizes },
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
          field: "winnerCode",
          label: "Winner EAN",
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
