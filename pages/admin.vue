<template>
  <section v-if="$store.state.user" class="section">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Results"><Results /></b-tab-item>
      <b-tab-item label="Codes"><Codes /></b-tab-item>
      <b-tab-item label="Import scores"><ImportFile /></b-tab-item>
      <b-tab-item label="Valid EAN"><ImportEans /></b-tab-item>
    </b-tabs>
  </section>
  <section v-else><p>Please Login to your accont</p></section>
</template>

<script>
import Results from "@/components/Results.vue";
import Codes from "@/components/Codes.vue";
import ImportFile from "@/components/ImportFile.vue";
export default {
  name: "Admin",
  components: {
    Results,
    Codes,
    ImportFile,
  },
  layout: "auth",
  data() {
    return {};
  },
};
</script>
