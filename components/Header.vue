<template>
  <nav
    class="navbar header has-shadow is-primary container mx-auto flex justify-between"
  >
    <span v-if="$store.state.user"
      >{{ $store.state.user.email
      }}<button @click="signOut">Sign Out</button></span
    >
    <span v-else>
      <nuxt-link to="/login">Log in</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link></span
    >
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    // eslint-disable-next-line node/handle-callback-err
    signOut(err) {
      this.$store.dispatch("signOut").catch((err) => {
        alert(err.message);
      });
    },
  },
};
</script>
