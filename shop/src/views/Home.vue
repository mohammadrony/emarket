<template>
  <div>
    <TopHeader />
    <SecondHeader />
    <TopCarousel />
    <Advertise />
    <TopSellProduct />
    <NewAddProduct />
    <Support />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TopHeader from "@/components/TopHeader.vue";
import SecondHeader from "@/components/Homes/SecondHeader.vue";
import TopCarousel from "@/components/Homes/TopCarousel.vue";
import Advertise from "@/components/Homes/Advertise.vue";
import TopSellProduct from "@/components/Homes/TopSellProduct.vue";
import NewAddProduct from "@/components/Homes/NewAddProduct.vue";
import Support from "@/components/Homes/Support.vue";
import Footer from "@/components/Footer.vue";
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
    Footer,
  },
  mounted() {
    this.$store.dispatch("Products/resetSearchParameter");
  },
};
</script>

<style lang="scss" scoped>
</style>
