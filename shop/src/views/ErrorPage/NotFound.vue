<template>
  <div>
    <TopHeader />
    <b-container class="mt-4">
      <b-row align-h="center">
        <div class="text-center">
          <div style="font-size: 100px">404</div>
          <h4>Page Not Found.</h4>
          <h6>This requested URL is not found on this server.</h6>
          <a href="/"><b-icon icon="arrow-left" />Go back Home</a>
        </div>
      </b-row>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "NotFound",
  components: {
    TopHeader,
    Footer
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
