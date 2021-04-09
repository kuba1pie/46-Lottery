<template>
  <section v-if="$store.state.user" class="section">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Results"></b-tab-item>
      <b-tab-item label="Codes"></b-tab-item>
      <b-tab-item label="Import scores"></b-tab-item>
    </b-tabs>
    <b-table :data="lotteryRes" :columns="columns"></b-table>
  </section>
  <section v-else><p>Please Login to your accont</p></section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Admin",
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
    ...mapState(["lotteryRes"]),
  },
  mounted() {
    this.getResults()
  },
  methods: {
    nuxtServerInit({ dispatch }, context) {
      return Promise.all([
        dispatch("get_posts", context),
        dispatch("any_other_actions", context),
      ]);
    },
    ...mapActions(["getResults"]),
  },
};
</script>
