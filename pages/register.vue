<template>
  <section class="p-6 w-1/5 mx-auto shadow-md is-flex-direction-column is-justify-content-center">
    <b-field
      label="Email: "
      type="is-danger"
      message="This email is invalid"
      @submit.prevent="userSignUp"
    >
      <b-input id="email" v-model="email" type="email" value="">
      </b-input>
    </b-field>

    <b-field label="Password: ">
      <b-input
        id="password"
        v-model="password"
        type="password"
        value=""
        password-reveal
      >
      </b-input>
      <b-input
        id="password_conf"
        v-model="password_conf"
        type="password"
        value=""
        password-reveal
      >
      </b-input>
    </b-field>
    <b-field v-if="password === password_conf && password !== ''">
      <b-button
        tag="input"
        class="button is-primary is-large"
        native-type="submit"
        value="Register and login"
        @click="userSignUp"
      />
    </b-field>
  </section>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      password_conf: ""
    };
  },
  methods: {
    // eslint-disable-next-line node/handle-callback-err
    userSignUp(err) {
      this.$store
        .dispatch("signUp", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.email = "";
          this.password = "";
          // if you wanted to redirect after sign in you'd do that here with this.$router.push('/pagename')
          this.$router.push("/admin");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  },
};
</script>
