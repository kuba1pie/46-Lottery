<template>
  <nav v-if="$store.state.user" class="navbar-meni">
    <img class="logo" src="../assets/logo.png" alt="My company name" />
    <nuxt-link to="/admin" class="navbar-item">Admin Panel</nuxt-link>
    <a class="navbar-item" @click="signOut">Sign Out</a>
  </nav>
  <nav v-else class="navbar-menu">
    <nuxt-link to="/"
      ><img class="logo" src="../assets/logo.png" alt="My company name"
    /></nuxt-link>
    <nuxt-link to="/preview" class="navbar-item">Preview</nuxt-link>
    <nuxt-link to="/login" class="navbar-item">Login</nuxt-link>
    <nuxt-link to="/register" class="navbar-item">Register</nuxt-link>
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
      this.$store
        .dispatch("signOut")
        .then(() => this.$router.push({ path: '/' }))
        .catch((err) => {
          alert(err.message);
        });
    },
  },
};
</script>
<style>
html body nav {
  margin: 0 auto;
  display: flex;
  padding: 1em 0;
  flex-flow: row no-wrap;
  justify-content: center;
  align-content: center;
}
nav > p,
a,
button {
  padding: 1em;
}
.logo {
  max-height: 150px;
}
nav > button {
  margin: 0.5em;
}
</style>
