/* eslint-disable prettier/prettier */
<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="main-content columns">
      <div class="container column is-10">
        <nuxt />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Codes",
          icon: "lightbulb",
          to: { name: "codes" },
        },
        {
          title: "Import",
          icon: "lightbulb",
          to: { name: "import" },
        },
        {
          title: "Results",
          icon: "home",
          to: { name: "results" },
        },
      ],
    };
  },
};
</script>
