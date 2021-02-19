<template>
  <div>
    <ATopHeader />
    <b-container class="mt-2">
      <b-row>
        <b-col class="text-center">
          <h3>Order #{{orderId}}</h3>
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
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import OrderDetails from "@/components/Admins/Order/OrderDetails.vue";
import OrderItems from "@/components/Admins/Order/OrderItems.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  name: "AOrder",
  components: {
    ATopHeader,
    OrderDetails,
    OrderItems,
    Footer,
  },
  data() {
    return {
      orderId: null
    };
  },
  mounted() {
    this.orderId = this.$route.params.orderId
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>
