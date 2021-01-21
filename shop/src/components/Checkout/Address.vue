<template>
  <div>
    <b-row>
      <b-col>
        <b-form>
          <h5>Personal Details</h5>
          <hr />
          <b-form-group
            id="input-group-name"
            label="Your Name"
            label-for="input-name"
          >
            <b-form-input
              v-model="fullName"
              id="input-name"
              type="text"
              placeholder="Your Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-email"
            label="Your Email"
            label-for="input-email"
          >
            <b-form-input
              v-model="email"
              id="input-email"
              type="email"
              placeholder="Enter Email"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-phone"
            label="Your Phone no."
            label-for="input-phone"
          >
            <b-form-input
              v-model="phone"
              id="input-phone"
              type="text"
              placeholder="Your Phone no."
              required
            ></b-form-input>
          </b-form-group>
          <div>
            <b-card bg-variant="light">
              <b-form-group
                label-cols-lg="3"
                label="Shipping Address"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
              >
                <b-form-group
                  label="Street:"
                  label-for="nested-street"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input id="nested-street"></b-form-input>
                </b-form-group>

                <b-form-group
                  label="City:"
                  label-for="nested-city"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input id="nested-city"></b-form-input>
                </b-form-group>

                <b-form-group
                  label="State:"
                  label-for="nested-state"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input id="nested-state"></b-form-input>
                </b-form-group>

                <b-form-group
                  label="Country:"
                  label-for="nested-country"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input id="nested-country"></b-form-input>
                </b-form-group>

                <b-form-group
                  label="Ship via:"
                  label-cols-sm="3"
                  label-align-sm="right"
                  class="mb-0"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-form-radio-group
                    class="pt-2"
                    :options="['Air', 'Courier', 'Mail']"
                    :aria-describedby="ariaDescribedby"
                  ></b-form-radio-group>
                </b-form-group>
              </b-form-group>
            </b-card>
          </div>
          <h5 class="mt-5">Shipping Address</h5>
          <hr />
          <b-form-group
            id="input-group-address"
            label="Your Full Address"
            label-for="input-address"
          >
            <b-form-textarea
              rows="3"
              max-rows="8"
              v-model="address"
              id="input-address"
              type="text"
              placeholder="Your Address here."
              required
            ></b-form-textarea>
          </b-form-group>
          <h5 class="mt-5">Shipping Options</h5>
          <hr />
          <b-form-group>
            <b-form-radio-group
              :options="shippingOptions"
              stacked
              v-model="selectedShipMethod"
            >
            </b-form-radio-group>
          </b-form-group>
          <h5 class="mt-5">Billing Options</h5>
          <hr />
          <b-form-group>
            <b-form-radio-group
              :options="paymentOptions"
              stacked
              v-model="selectedPayMethod"
            >
            </b-form-radio-group>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Address",
  components: {},
  data() {
    return {
      fullName: null,
      email: null,
      phone: null,
      address: null,
      shippingRate: 4,
      selectedShipMethod: "shippingRate",
      selectedPayMethod: "stripe",
      shippingOptions: [
        {
          text: "Flat Shipping Rate - 4 $",
          value: "shippingRate",
        },
      ],
      paymentOptions: [
        {
          text: "Stripe Payment Method",
          value: "stripe",
        },
      ],
    };
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang="sass" scoped>
</style>