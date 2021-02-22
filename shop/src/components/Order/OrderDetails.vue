<template>
  <div>
    <div v-if="validOrder">
      <b-row>
        <b-col>
          <h5 style="font-weight: bold">Order Cost</h5>
          <hr />

          <h6 style="font-weight: bold">Product Value</h6>
          {{ orderInfo.productCost }} {{ orderInfo.currency }}
          <hr />
          <h6 class="mt-4" style="font-weight: bold">Shipping Cost</h6>
          {{ orderInfo.shippingCost }} {{ orderInfo.currency }}
          <hr />
          <h6 class="mt-4" style="font-weight: bold">Total Amount</h6>
          {{ orderInfo.productCost + orderInfo.shippingCost }}
          {{ orderInfo.currency }}
          <hr />
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col>
          <h5 style="font-weight: bold">Customer Details</h5>
          <hr />
          <h6 style="font-weight: bold">Name</h6>
          {{ orderInfo.name }}
          <h6 class="mt-4" style="font-weight: bold">Email</h6>
          {{ orderInfo.email }}
          <h6 class="mt-4" style="font-weight: bold">Phone No.</h6>
          {{ orderInfo.phoneNo }}
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col>
          <h5 style="font-weight: bold">Shipping Address</h5>
          <hr />
          <div v-html="orderInfo.address"></div>
        </b-col>
      </b-row>
    </div>
    <div v-if="!validOrder">
      <b-row>
        <b-col>
          <b-card class="mt-4">
            <b-alert variant="primary" class="mb-0" show>
              It looks like you clicked on an invalid link.
              <br />
              Please check your order session id.
              <br />
              Go to
              <b-link to="/">
                Home Page
                <b-icon icon="arrow-right" />
              </b-link>
            </b-alert>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import OrderService from "@/services/OrderService.js";

export default {
  name: "OrderDetails",
  components: {},
  data() {
    return {
      orderInfo: {},
      validOrder: false
    };
  },
  async mounted() {
    const sessionId = this.$route.params.sessionId;
    try {
      this.orderInfo = (await OrderService.getOrderBySessionId(sessionId)).data;
      this.validOrder = Object.keys(this.orderInfo).length != 0;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
