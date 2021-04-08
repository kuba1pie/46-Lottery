<template>
  <section v-if="$store.state.user" class="section">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Results"></b-tab-item>
      <b-tab-item label="Codes"></b-tab-item>
      <b-tab-item label="Import scores"></b-tab-item>
    </b-tabs>
  </section>
  <section v-else><p>Please Login to your accont</p></section>
</template>

<script>
export default {
  name: "HomePage",
  layout: "auth",
};
</script>
