/* eslint-disable prettier/prettier */
<template>
  <div>
    <Header />
    <main class="main-content columns">
      <div class="container column is-10">
        <nuxt />
      </div>
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
