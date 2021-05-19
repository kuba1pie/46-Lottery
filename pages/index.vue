<template>
  <section class="section is-centered is-mobile m-6 p-6">
    <div class="block">
      <h1 class="title">Lottery 2021</h1>
      <p class="subtitle">
        Use this form to check if your <strong>EAN13</strong> code!
      </p>
      <CheckEan />
    </div>
    <div class="block">
          <h2>This page is developed as training task.</h2>
          <h3>Requirements:</h3>
          <ul>
            <li>Authentication by Google Firebase</li>
            <li>You can create your own profile!</li>
            <li>If already logged in you can see the entire Admin Dashboard</li>
            <li>If won't you can onlypreview it in the Preview Page also</li>
            <li>On the admin panel you can:
              <ol>Import valid EANS as .csv file</ol>
              <ol>Import prizes with win time as .csv file</ol>
              <ol>Check already scanned codes and results</ol>
            </li>
          </ul>
      <article class="message is-warning m-6">
        <div class="message-body">
          <p>Check the source code on the repository.</p>
          <a href="https://github.com/kuba1pie/46-Lottery"
            >/kuba1pie/46-Lottery</a
          >
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import CheckEan from "@/components/CheckEan.vue";

export default {
  name: "HomePage",
  components: {
    CheckEan,
  },
  data() {
    return {};
  },
};
</script>
<style lang="css">
.field {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
