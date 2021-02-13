<template>
  <div>
    <b-row class="mt-5">
      <b-col cols="3">
        <b-button
          class="mb-2"
          v-if="admin && visible"
          variant="warning"
          size="sm"
        >
          <b-icon icon="pen"></b-icon>
        </b-button>
        <b-img
          @click="advertise"
          src="http://localhost:8084/public/display-images/mac-mini.png"
        ></b-img>
      </b-col>
      <b-col cols="3">
        <b-button
          class="mb-2"
          v-if="admin && visible"
          variant="warning"
          size="sm"
        >
          <b-icon icon="pen"></b-icon>
        </b-button>
        <b-img
          @click="advertise"
          src="http://localhost:8084/public/display-images/ipad-2020.jpeg"
        ></b-img>
      </b-col>
      <b-col cols="3">
        <b-button
          class="mb-2"
          v-if="admin && visible"
          variant="warning"
          size="sm"
        >
          <b-icon icon="pen"></b-icon>
        </b-button>
        <b-img
          @click="advertise"
          src="http://localhost:8084/public/display-images/razer-opus.jpeg"
        ></b-img>
      </b-col>
      <b-col cols="3">
        <b-button
          class="mb-2"
          v-if="admin && visible"
          variant="warning"
          size="sm"
        >
          <b-icon icon="pen"></b-icon>
        </b-button>
        <b-img
          @click="advertise"
          src="http://localhost:8084/public/display-images/p120.jpeg"
        ></b-img>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col cols="6">
        <b-button
          class="mb-2"
          v-if="admin && visible"
          variant="warning"
          size="sm"
        >
          <b-icon icon="pen"></b-icon>
        </b-button>
        <b-img
          @click="banner"
          src="http://localhost:8084/public/display-images/smart-watches.jpeg"
        ></b-img>
      </b-col>
      <b-col cols="6">
        <b-button
          class="mb-2"
          v-if="admin && visible"
          variant="warning"
          size="sm"
        >
          <b-icon icon="pen"></b-icon>
        </b-button>
        <b-img
          @click="banner"
          src="http://localhost:8084/public/display-images/lenovo-yoga.jpeg"
        ></b-img>
      </b-col>
    </b-row>
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
    this.admin = this.$store.state.CurrentUser.admin;
  },
  methods: {
    advertise() {
      window.location.replace("/");
    },
    banner() {
      window.location.replace("/");
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
