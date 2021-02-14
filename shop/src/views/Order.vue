<template>
  <div>
    <TopHeader />
    <b-container class="mt-4">
      <b-row>
        <b-col class="text-center">
          <h3>Online Order Status</h3>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="6">
          <OrderDetails />
        </b-col>
        <b-col cols="6">
          <OrderItems />
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import OrderDetails from "@/components/Order/OrderDetails.vue";
import OrderItems from "@/components/Order/OrderItems.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Order",
  components: {
    TopHeader,
    OrderDetails,
    OrderItems,
    Footer
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
