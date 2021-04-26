<template>
  <div>
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Prizes"><Prizes /></b-tab-item>
      <b-tab-item label="Valid EANs"><Eans /></b-tab-item>
      <b-tab-item label="Scaned Codes"><Codes /></b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Prizes from "@/components/Prizes.vue";
import Codes from "@/components/Codes.vue";
import Eans from "@/components/Eans.vue";
export default {
  name: "Admin",
  components: {
    Prizes,
    Codes,
    Eans,
  },
  layout: "auth",
  data() {
    return {};
  },
};
</script>
