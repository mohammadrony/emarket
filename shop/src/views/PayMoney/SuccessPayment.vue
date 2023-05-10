<template>
  <div>
    <TopHeader></TopHeader>
    <b-container class="mt-5">
      <b-row align-h="center">
        <b-col cols="6" class="text-center">
          <b-card
            border-variant="primary"
            header="Payment Succeeded"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
          >
            <b-button size="lg" disabled variant="primary">
              <b-icon icon="check" scale="3" />
            </b-button>
            <h1 class="mt-4">You're all set!</h1>
            <h6>Thanks for your purchase!</h6>
            <h6>We'll deliver your order in few days.</h6>
            <b-card-footer class="mt-4"> emarket.com </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
import CheckoutService from "@/services/CheckoutService.js";
import OrderService from "@/services/OrderService.js";
import OrderItemService from "@/services/OrderItemService.js";
import ProductsService from "@/services/ProductsService.js";
export default {
  name: "SuccessPayment",
  components: {
    TopHeader,
    MyFooter,
  },
  data() {
    return {
      order: {},
      session: {},
      validSession: false,
    };
  },
  async mounted() {
    const sessionId = this.$route.query.id;
    var previousOrder;
    try {
      previousOrder = (await OrderService.getOrderBySessionId(sessionId)).data;
    } catch (error) {
      console.log(error.response.data.error);
    }
    if (previousOrder) return;
    this.$store.dispatch("Cart/clearCart");
    try {
      this.session = (
        await CheckoutService.retrieveCheckoutSession(sessionId)
      ).data;
      this.validSession = Object.keys(this.session).length != 0;
    } catch (error) {
      console.log(error.response.data.error);
    }
    if (!this.validSession) return;
    const lineItems = this.session.line_items.data;
    const shipCost = lineItems[lineItems.length - 1].amount_total;
    try {
      this.order = (
        await OrderService.createOrder({
          name: this.session.metadata.customerName,
          phoneNo: this.session.metadata.customerPhoneNo,
          email: this.session.customer_email,
          address: this.session.metadata.shippingAddress,
          status: "paid",
          variant: "dark",
          checkoutSessionId: sessionId,
          productCost: (this.session.amount_total - shipCost) / 100,
          currency: this.session.currency.toUpperCase(),
          shippingCost: shipCost / 100,
        })
      ).data;
    } catch (error) {
      console.log(error.response.data.error);
    }

    var i;
    for (i = 0; i < lineItems.length - 1; i++) {
      var productId;
      try {
        productId = (
          await ProductsService.getProductId(
            encodeURIComponent(lineItems[i].description)
          )
        ).data;
      } catch (error) {
        console.log(error.response.data.error);
      }
      try {
        await OrderItemService.createOrderItem({
          quantity: lineItems[i].quantity,
          ProductId: productId,
          OrderId: this.order.id,
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
      var lineproduct;
      try {
        lineproduct = (await ProductsService.getProductSales(productId)).data;
      } catch (error) {
        console.log(error.response.data.error);
      }
      try {
        await ProductsService.updateProduct({
          id: productId,
          sales: lineproduct.sales + lineItems[i].quantity,
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>
