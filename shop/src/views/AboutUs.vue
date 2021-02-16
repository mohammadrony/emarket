<template>
  <div class="aboutpage">
    <TopHeader></TopHeader>
    <h1>About Us</h1>
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
export default {
  name: "AboutUs",
  components: {
    TopHeader
  }
};
</script>

<style lang="scss" scoped>.top-container {
  background-color: #bebdbd;
}
</style>
