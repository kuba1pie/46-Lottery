<template>
  <section class="section">
    <div class="columns is-mobile">
      <b-field>
        <b-input placeholder="Number" type="number" min="13" max="13">
        </b-input>
        <b-button @click="clickMe">Click Me</b-button>
      </b-field>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
