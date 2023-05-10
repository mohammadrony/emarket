<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <hr />
          <b-row class="my-5" id="customer-support" align-v="center">
            <b-col class="text-center">
              <b-card>
                <b-img
                  height="125"
                  src="http://localhost:8084/public/display-icons/fast-delivery-icon.png"
                />
                <br />
                <h5 class="mt-1">
                  <a style="text-decoration: none" href="#customer-support"
                    >Fast Delivery</a
                  >
                </h5>
              </b-card>
            </b-col>

            <b-col class="text-center">
              <b-card>
                <b-img
                  height="125"
                  src="http://localhost:8084/public/display-icons/card-payment-icon.png"
                />
                <br />
                <h5 class="mt-1">
                  <a style="text-decoration: none" href="#customer-support"
                    >Easy Payment</a
                  >
                </h5>
              </b-card>
            </b-col>

            <b-col class="text-center">
              <b-card>
                <b-img
                  height="125"
                  src="http://localhost:8084/public/display-icons/online-support-icon.png"
                />
                <br />
                <h5 class="mt-1">
                  <a style="text-decoration: none" href="#customer-support"
                    >Support 24 Hours</a
                  >
                </h5>
              </b-card>
            </b-col>
          </b-row>
          <hr />
          <!-- <b-row id="newsletter" class="pt-4">
            <b-col class="text-center">
              <p style="font-size: 34px">Subscribe to our newsletter</p>
              <p>
                Find special offers, coupon codes, and exclusive promotions by
                Subscribe to the emarket.com Newsletter
              </p>
              <b-row>
                <b-col cols="3" />
                <b-col cols="6">
                  <b-form-input
                    class="mt-4"
                    size="lg"
                    placeholder="Email Address"
                  />
                </b-col>
                <b-col cols="3" />
              </b-row>
              <b-button
                class="mt-5 px-5"
                size="lg"
                variant="outline-info"
                href="#newsletter"
              >
                Subscribe
              </b-button>
            </b-col>
          </b-row> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Support",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>
