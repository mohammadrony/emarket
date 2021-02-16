<template>
  <div>
    <b-row>
      <b-col cols="6" v-for="orderItem in orderItems" :key="orderItem.id">
        <b-card-group deck>
          <b-card img-top style="max-width: 14rem" class="mb-4">
            <b-card-img
              :src="orderItem.Product.image1"
              style="max-width: 14rem; max-height: 14rem"
              alt="Image Not Found"
            />
            <br />
            <b-link @click="viewProduct(orderItem)">
              {{ orderItem.Product.title }}
            </b-link>
            <br />
            <small class="mt-2">
              Price: {{ orderItem.Product.amount }}
              {{ orderItem.Product.currency }}
            </small>
            <br />
            <small class="mt-2">Quantity: {{ orderItem.quantity }}</small>
            <br />
            <small class="mt-2">
              Cost: {{ orderItem.Product.amount * orderItem.quantity }}
              {{ orderItem.Product.currency }}
            </small>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h5 style="font-weight: bold">Current State</h5>
        <hr />
        <b-row>
          <b-col cols="5">
            <b-button block :variant="statusVariant">
              {{ orderStatus }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import OrderItemService from "@/services/OrderItemService.js";
import OrderService from "@/services/OrderService.js";
export default {
  name: "OrderItems",
  components: {},
  data() {
    return {
      message: null,
      orderItems: [],
      orderStatus: "",
      orderInfo: {},
      statusVariant: ""
    };
  },
  async mounted() {
    const sessionId = this.$store.state.route.params.sessionId;
    console.log("order items", sessionId);
    try {
      this.orderInfo = (await OrderService.getOrderBySessionId(sessionId)).data;
      console.log("from order items side", this.orderInfo);
      this.orderStatus = this.orderInfo.status;
      this.statusVariant = this.orderInfo.variant;
    } catch (error) {
      console.log(error.response.data.error);
    }
    try {
      this.orderItems = (
        await OrderItemService.getOrderItemList(this.orderInfo.id)
      ).data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  computed: {},
  methods: {
    sendFeedback() {},
    viewProduct(orderItem) {
      const route = "/product/" + orderItem.Product.id;
      window.location.replace(route);
    }
  }
};
</script>

<style lang="scss" scoped></style>
