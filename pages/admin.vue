<template>
  <section v-if="$store.state.user" class="section">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Results"><Results /></b-tab-item>
      <b-tab-item label="Codes"><Codes /></b-tab-item>
      <b-tab-item label="Import awards file"><ImportFile /></b-tab-item>
      <b-tab-item label="Valid EAN"><ImportEans /></b-tab-item>
    </b-tabs>
  </section>
  <section v-else class="section">
    <p>Please Login to your accont</p>
    <Login />
  </section>
</template>

<script>
import Results from "@/components/Results.vue";
import Codes from "@/components/Codes.vue";
import ImportFile from "@/components/ImportFile.vue";
import ImportEans from "@/components/ImportEans.vue";
import Login from "@/components/Login.vue";
export default {
  name: "Admin",
  components: {
    Results,
    Codes,
    ImportEans,
    ImportFile,
    Login,
  },
  layout: "auth",
  data() {
    return {};
  },
};
</script>
