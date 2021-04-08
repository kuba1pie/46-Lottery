<template>
  <section class="section">
    <div class="columns is-mobile">
      <b-field class="file">
        <b-upload v-model="file" expanded>
          <a class="button is-primary is-fullwidth">
            <b-icon icon="upload"></b-icon>
            <span>{{ file.name || "Click to upload" }}</span>
          </a>
        </b-upload>
      </b-field>
      <b-field>
        <b-upload v-model="dropFiles" multiple drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <b-button @click="clickMe">Click Me</b-button>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  layout: "auth",

  data() {
    return {
      file: {},
      dropFiles: [],
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
  },
};
</script>
