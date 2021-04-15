<template>
  <nav class="has-shadow navbar mx-auto flex justify-between">
    <span v-if="$store.state.user" class="container">
      <p>User: {{ $store.state.user.email }}</p>
      <nuxt-link to="/admin">Admin</nuxt-link
      ><b-button @click="signOut">Sign Out</b-button></span
    >
    <span v-else class="container">
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
