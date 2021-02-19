<template>
  <div>
    <TopHeader />
    <SecondHeader />
    <b-container>
      <Showcase class="mt-3" />
      <TopSellProduct class="mt-5" />
      <NewAddProduct class="mt-5" />
      <Support class="mt-5" />
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
// @ is an alias to /src
import TopHeader from "@/components/Common/TopHeader.vue";
import SecondHeader from "@/components/Home/SecondHeader.vue";
import Showcase from "@/components/Home/Showcase.vue";
import TopSellProduct from "@/components/Home/TopSellProduct.vue";
import NewAddProduct from "@/components/Home/NewAddProduct.vue";
import Support from "@/components/Home/Support.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  name: "Home",
  components: {
    TopHeader,
    SecondHeader,
    Showcase,
    TopSellProduct,
    NewAddProduct,
    Support,
    Footer
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
