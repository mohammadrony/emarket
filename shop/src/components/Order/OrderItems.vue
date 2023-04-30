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
            <b-link :to="{ path: `/product/${orderItem.Product.id}` }">
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
        <h5 class="font-weight-bold">Current State</h5>
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
export default {
  name: "OrderItems",
  props: {
    orderItems: {
      type: Array,
      required: true,
    },
    orderInfo: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      orderStatus: this.orderInfo.status,
      statusVariant: this.orderInfo.variant,
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
