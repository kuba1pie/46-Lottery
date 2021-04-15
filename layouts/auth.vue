/* eslint-disable prettier/prettier */
<template>
  <div id="auth">
    <Header />
    <main class="main-content columns container">
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      items: [
        {
          title: "Codes",
          icon: "lightbulb",
          to: { name: "codes" },
        },
        {
          title: "Import",
          icon: "lightbulb",
          to: { name: "import" },
        },
        {
          title: "Results",
          icon: "home",
          to: { name: "results" },
        },
      ],
    };
  },
};
</script>
