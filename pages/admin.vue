<template>
  <section class="section">
    <div class="columns is-mobile">
      <b-field label="Email" type="is-danger" message="This email is invalid">
        <b-input type="email" value="" maxlength="30"> </b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" value="" password-reveal>
        </b-input>
      </b-field>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  layout: "auth"
};
</script>
