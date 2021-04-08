<template>
  <section v-if="$store.state.user" class="section">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Results"></b-tab-item>
      <b-tab-item label="Codes"></b-tab-item>
      <b-tab-item label="Import scores"></b-tab-item>
    </b-tabs>
    <button @click="getResults">Greet</button>
    <button @click="getResults2">Greet</button>
  </section>
  <section v-else><p>Please Login to your accont</p></section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HomePage",
  layout: "auth",
  data() {
    return {};
  },
  methods: {
    nuxtServerInit({ dispatch }, context) {
      return Promise.all([
        dispatch("get_posts", context),
        dispatch("any_other_actions", context),
      ]);
    },
    ...mapActions(["getResults2", "getResults"]),
    ddd() {
      // eslint-disable-next-line no-console
      this.getResults2();
      console.log("ddd");
    },
  },
};
</script>
