<template>
  <div>
    <TopHeader/>
    <b-row align-h="center" class="m-5 p-5">
      <div class="text-center">
        <a style="font-size: 100px"> 401</a>
        <h4>Unauthorized Page</h4>
        <a href="/"><b-icon icon="arrow-left"/> Go back Home</a>
      </div>
    </b-row>
    <Footer/>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Unauthorized",
  components: {
    TopHeader,
    Footer,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang="sass" scoped>
</style>