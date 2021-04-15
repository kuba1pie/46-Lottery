/* eslint-disable prettier/prettier */
<template>
  <div id="default">
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
          title: "Home",
          icon: "home",
          to: { name: "index" },
        },
        {
          title: "Login",
          icon: "lightbulb",
          to: { name: "login" },
        },
      ],
    };
  },
};
</script>
