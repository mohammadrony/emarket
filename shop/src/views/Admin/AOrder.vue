<template>
  <div>
    <ATopHeader />
    <b-container v-if="validParam">
      <b-row class="mt-2">
        <b-col class="text-center">
          <h3>Order #{{ orderId }}</h3>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="6">
          <OrderDetails :key="componentKey" :orderInfo="orderInfo" />
        </b-col>
        <b-col cols="6">
          <OrderItems
            :key="componentKey"
            :orderItems="orderItems"
            :orderInfo="orderInfo"
          />
        </b-col>
      </b-row>
    </b-container>
    <div v-if="!validParam">
      <InvalidParameter
        paramName="order"
        pageToNavigate="Orders Page"
        routerLink="/admin/orders"
      />
    </div>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import OrderItemService from "@/services/OrderItemService.js";
import OrderService from "@/services/OrderService.js";
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import InvalidParameter from "@/components/NotFound/InvalidParameter.vue";
import OrderDetails from "@/components/Admins/Order/OrderDetails.vue";
import OrderItems from "@/components/Admins/Order/OrderItems.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "AOrder",
  components: {
    ATopHeader,
    InvalidParameter,
    OrderDetails,
    OrderItems,
    MyFooter,
  },
  data() {
    return {
      orderId: 0,
      orderInfo: {},
      orderItems: [],
      componentKey: 0,
      validParam: true,
    };
  },
  async mounted() {
    this.orderId = this.$route.params.orderId;
    try {
      this.orderInfo = (await OrderService.getOrder(this.orderId)).data;
      this.validParam = Object.keys(this.orderInfo).length != 0;
    } catch (error) {
      console.log(error.response.data.error);
    }
    try {
      this.orderItems = (
        await OrderItemService.getOrderItemList(this.orderId)
      ).data;
      this.componentKey += 1;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>
