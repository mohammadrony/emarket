<template>
  <div>
    <TopHeader />
    <SecondHeader />
    <b-container>
      <TopCarousel class="mt-3" />
      <Advertise class="mt-5" />
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
import TopCarousel from "@/components/Home/TopCarousel.vue";
import Advertise from "@/components/Home/Advertise.vue";
import TopSellProduct from "@/components/Home/TopSellProduct.vue";
import NewAddProduct from "@/components/Home/NewAddProduct.vue";
import Support from "@/components/Home/Support.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  name: "Home",
  components: {
    TopHeader,
    SecondHeader,
    TopCarousel,
    Advertise,
    TopSellProduct,
    NewAddProduct,
    Support,
    Footer
  },
  mounted() {
    this.$store.dispatch("Products/resetSearchParameter");
  }
};
</script>

<style lang="scss" scoped></style>
