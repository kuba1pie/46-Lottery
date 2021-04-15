<template>
  <section class="p-6 w-1/5 container mx-auto shadow-md">
    <b-field
      label="Email"
      type="is-danger"
      message="This email is invalid"
      @submit.prevent="userLogIn"
    >
      <b-input id="email" v-model="email" type="email" value="" maxlength="30">
      </b-input>
    </b-field>

    <b-field label="Password">
      <b-input
        id="password"
        v-model="password"
        type="password"
        value=""
        password-reveal
      >
      </b-input>
    </b-field>
    <b-button
      tag="input"
      native-type="submit"
      value="Login"
      @click="userLogIn"
    />
  </section>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    // eslint-disable-next-line node/handle-callback-err
    userLogIn(err) {
      this.$store
        .dispatch("signInWithEmail", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.email = "";
          this.password = "";
          this.$router.push("/admin");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  },
};
</script>
