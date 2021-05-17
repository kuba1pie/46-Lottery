<template>
  <section class="p-6 w-1/5 container mx-auto shadow-md">
    <Login />
  </section>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  name: "Login",
  components: {
    Login,
  },
  layout: "auth",
  data() {
    return {};
  },
};