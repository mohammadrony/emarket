<template>
  <div>
    <TopHeader />
    <b-container v-if="validParam">
      <b-row class="mt-4">
        <b-col class="text-center">
          <h3>Online Order Status</h3>
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
        pageToNavigate="Home Page"
        routerLink="/"
      />
    </div>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import OrderService from "@/services/OrderService.js";
import TopHeader from "@/components/Common/TopHeader.vue";
import OrderItemService from "@/services/OrderItemService.js";
import InvalidParameter from "@/components/NotFound/InvalidParameter.vue";
import OrderDetails from "@/components/Order/OrderDetails.vue";
import OrderItems from "@/components/Order/OrderItems.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "Order",
  components: {
    TopHeader,
    InvalidParameter,
    OrderDetails,
    OrderItems,
    MyFooter,
  },
  data() {
    return {
      orderInfo: {},
      orderItems: [],
      componentKey: 0,
      validParam: true,
    };
  },
  async mounted() {
    const sessionId = this.$route.params.sessionId;
    try {
      this.orderInfo = (await OrderService.getOrderBySessionId(sessionId)).data;
      this.validParam = Object.keys(this.orderInfo).length != 0;
    } catch (error) {
      console.log(error.response.data.error);
    }
    try {
      this.orderItems = (
        await OrderItemService.getOrderItemList(this.orderInfo.id)
      ).data;
      this.componentKey += 1;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
