<template>
  <div>
    <b-container class="mt-5">
      <b-row>
        <b-col>
          <b-button class="mb-2" v-if="admin && visible" variant="warning" size="sm">
            <b-icon icon="pen"></b-icon>
          </b-button>
          <b-img
            @click="advertise"
            src="http://localhost:8084/public/display-images/mac-mini.png"
          ></b-img>
        </b-col>
        <b-col>
          <b-button class="mb-2" v-if="admin && visible" variant="warning" size="sm">
            <b-icon icon="pen"></b-icon>
          </b-button>
          <b-img
            @click="advertise"
            src="http://localhost:8084/public/display-images/ipad-2020.jpeg"
          ></b-img>
        </b-col>
        <b-col>
          <b-button class="mb-2" v-if="admin && visible" variant="warning" size="sm">
            <b-icon icon="pen"></b-icon>
          </b-button>
          <b-img
            @click="advertise"
            src="http://localhost:8084/public/display-images/razer-opus.jpeg"
          ></b-img>
        </b-col>
        <b-col>
          <b-button class="mb-2" v-if="admin && visible" variant="warning" size="sm">
            <b-icon icon="pen"></b-icon>
          </b-button>
          <b-img
            @click="advertise"
            src="http://localhost:8084/public/display-images/p120.jpeg"
          ></b-img>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col>
          <b-button class="mb-2" v-if="admin && visible" variant="warning" size="sm">
            <b-icon icon="pen"></b-icon>
          </b-button>
          <b-img
            @click="banner"
            src="http://localhost:8084/public/display-images/smart-watches.jpeg"
          ></b-img>
        </b-col>
        <b-col>
          <b-button class="mb-2" v-if="admin && visible" variant="warning" size="sm">
            <b-icon icon="pen"></b-icon>
          </b-button>
          <b-img
            @click="banner"
            src="http://localhost:8084/public/display-images/lenovo-yoga.jpeg"
          ></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Advertise",
  components: {},
  data() {
    return {
      visible: false,
      admin: null,
    };
  },
  mounted() {
    this.admin = this.$store.state.admin;
  },
  methods: {
    advertise() {
      window.location.replace("/products");
    },
    banner() {
      const x = "book and book",
        y = 4;
      window.location.replace(`/${x}/${y}?hello=goo&no=ok`);
    },
  },
  computed: {},
};
</script>

<style lang="sass" scoped>
</style>