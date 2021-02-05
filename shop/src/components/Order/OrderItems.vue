<template>
  <div>
    <b-row>
      <b-col cols="4" v-for="orderItem in orderItems" :key="orderItem.id">
        <b-card-group deck>
          <b-card img-top style="max-width: 14rem" class="mb-4">
            <b-card-img
              :src="orderItem.Product.image1"
              style="max-width: 14rem; max-height: 14rem"
              alt="Image Not Found"
            ></b-card-img
            ><br />
            <b-link @click="viewProduct(orderItem)">{{
              orderItem.Product.title
            }}</b-link>
            <br />
            <small class="mt-2"
              >Price: {{ orderItem.Product.amount }}
              {{ orderItem.Product.currency }}</small
            >
            <br />
            <small class="mt-2">Quantity: {{ orderItem.quantity }}</small>
            <br />
            <small class="mt-2"
              >Cost: {{ orderItem.Product.amount * orderItem.quantity }}
              {{ orderItem.Product.currency }}</small
            >
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
        <b-row class="mt-2" v-if="orderStatus != 'complete'">
          <b-col>
            <small>
              Know your current order status from here.
              <br />
              <b-link v-b-toggle.collapse-feedback>contact us</b-link>
            </small>
          </b-col>
        </b-row>
        <b-row class="mt-2" v-if="orderStatus == 'complete'">
          <b-col>
            <small>
              Please, let us know any feedback from you about this order.
              <br />
              Any Question or Suggestion?
              <b-link v-b-toggle.collapse-feedback>contact us</b-link>
            </small>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-collapse id="collapse-feedback">
      <hr />
      <b-form>
        <b-form-group id="input-group-name" label="Name" label-for="input-name">
          <b-form-input
            v-model="orderInfo.name"
            id="input-name"
            type="text"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-email"
          label="Email"
          label-for="input-email"
        >
          <b-form-input
            v-model="orderInfo.email"
            id="input-email"
            type="email"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-message"
          label="Message"
          label-for="input-message"
        >
          <b-form-textarea
            rows="8"
            max-rows="10"
            v-model="message"
            id="input-message"
            type="text"
            @keyup="sendFeedback"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-row>
          <b-col cols="5">
            <b-button variant="warning">Send</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-collapse>
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
    console.log("order items",sessionId)
    try {
      this.orderInfo = (await OrderService.getOrderBySessionId(sessionId)).data;
      console.log("from order items side",this.orderInfo)
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

<style lang="sass" scoped>
</style>