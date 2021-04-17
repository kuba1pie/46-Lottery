<template>
  <section class="section">
    <p>Please Login to your accont</p>
    <Login />
  </section>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  name: "Admin",
  components: {

    Login,
  },
  layout: "auth",
  data() {
    return {};
  },
};