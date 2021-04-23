<template>
  <div v-if="$store.state.user">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Prizes"><Prizes /></b-tab-item>
      <b-tab-item label="Valid EANs"><Eans /></b-tab-item>
      <b-tab-item label="Scaned Codes"><Codes /></b-tab-item>
    </b-tabs>
  </div>
  <section v-else class="section">
    <p>Please Login to your accont</p>
    <Login />
  </section>
</template>

<script>
import Prizes from "@/components/Prizes.vue";
import Codes from "@/components/Codes.vue";
import Eans from "@/components/Eans.vue";
import Login from "@/components/Login.vue";
export default {
  name: "Admin",
  components: {
    Prizes,
    Codes,
    Eans,
    Login,
  },
  layout: "auth",
  data() {
    return {};
  },
};
</script>
