<template>
  <div id="default">
    <Header />
    <main class="is-flex-direction-column is-justify-content-center">
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
