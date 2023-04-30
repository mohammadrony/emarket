<template>
  <div>
    <TopHeader></TopHeader>
    <b-container class="mt-5">
      <h1>About Us</h1>
      <h2>About Us</h2>
      <h3>About Us</h3>
      <h4>About Us</h4>
      <h5>About Us</h5>
      <h6>About Us</h6>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "AboutUs",
  components: {
    TopHeader,
    MyFooter,
  },
};
</script>

<style lang="scss" scoped></style>
