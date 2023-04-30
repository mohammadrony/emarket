<template>
  <div>
    <b-row>
      <b-col>
        <b-form>
          <h5 class="font-weight-bold">Personal Details</h5>
          <hr />
          <b-form-group
            id="input-group-name"
            label="Name"
            label-for="input-name"
          >
            <b-form-input
              v-model="name"
              id="input-name"
              type="text"
              @change="setName"
              :state="nameValidation"
              required
            />
          </b-form-group>
          <b-form-group
            id="input-group-email"
            label="Email"
            label-for="input-email"
          >
            <b-form-input
              v-model="email"
              id="input-email"
              type="email"
              @change="setEmail"
              :state="emailValidation"
              required
            />
          </b-form-group>
          <b-form-group
            id="input-group-phone"
            label="Phone no."
            label-for="input-phone"
          >
            <b-form-input
              v-model="phoneNo"
              id="input-phone"
              type="text"
              @change="setPhoneNo"
              :state="phoneNoValidation"
              required
            />
          </b-form-group>
          <div class="mt-4">
            <b-card bg-variant="light">
              <b-form-group
                label-cols-lg="3"
                label="Shipping Address"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
              >
                <b-form-group
                  label="Line1:"
                  label-for="nested-line1"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    :state="line1Validation"
                    required
                    v-model="line1"
                    @change="setAddressLine1"
                    id="nested-line1"
                  />
                </b-form-group>
                <b-form-group
                  label="Line2:"
                  label-for="nested-line2"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    :state="line2Validation"
                    required
                    v-model="line2"
                    @change="setAddressLine2"
                    id="nested-line2"
                  />
                </b-form-group>

                <b-form-group
                  label="Zip Code:"
                  label-for="nested-zipcode"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    :state="zipCodeValidation"
                    required
                    v-model="zipCode"
                    @change="setAddressZipCode"
                    id="nested-zipcode"
                  />
                </b-form-group>

                <b-form-group
                  label="City:"
                  label-for="nested-city"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    :state="cityValidation"
                    required
                    v-model="city"
                    @change="setAddressCity"
                    id="nested-city"
                  />
                </b-form-group>
                <b-form-group
                  label="Division:"
                  label-for="nested-division"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    :state="divisionValidation"
                    required
                    v-model="division"
                    @change="setAddressDivision"
                    id="nested-division"
                  />
                </b-form-group>

                <b-form-group
                  class="mb-0"
                  label="Country:"
                  label-for="nested-country"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    :state="countryValidation"
                    required
                    v-model="country"
                    @change="setAddressCountry"
                    id="nested-country"
                  />
                </b-form-group>
              </b-form-group>
            </b-card>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "AddressForm",
  components: {},
  data() {
    return {
      name: null,
      email: null,
      phoneNo: null,
      phoneNoMin: 6,
      phoneNoMax: 20,
      line1: null,
      line2: null,
      zipCode: null,
      city: null,
      division: null,
      country: null,
      formatNumber: /^[0-9+-]+$/,
      formatEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    };
  },
  computed: {
    nameValidation() {
      if (this.name == null) return null;
      else if (this.name.length == 0) return false;
      else return true;
    },
    emailValidation() {
      if (this.email == null) return null;
      return this.formatEmail.test(this.email);
    },
    phoneNoValidation() {
      if (this.phoneNo == null) return null;
      else if (
        this.phoneNo.length >= this.phoneNoMin &&
        this.phoneNo.length <= this.phoneNoMax &&
        this.formatNumber.test(this.phoneNo)
      )
        return true;
      else return false;
    },
    line1Validation() {
      if (this.line1 == null) return null;
      else if (this.line1.length == 0) return false;
      else return true;
    },
    line2Validation() {
      if (this.line2 == null) return null;
      else if (this.line2.length == 0) return false;
      else return true;
    },
    zipCodeValidation() {
      if (this.zipCode == null) return null;
      else if (this.zipCode.length == 0) return false;
      else return true;
    },
    cityValidation() {
      if (this.city == null) return null;
      else if (this.city.length == 0) return false;
      else return true;
    },
    divisionValidation() {
      if (this.division == null) return null;
      else if (this.division.length == 0) return false;
      else return true;
    },
    countryValidation() {
      if (this.country == null) return null;
      else if (this.country.length == 0) return false;
      else return true;
    },
  },
  async mounted() {
    await this.$store.dispatch("Checkout/resetCustomerDetails");
    const user = this.$store.state.CurrentUser.user;
    if (Object.keys(user).length != 0) {
      this.name = user.firstName + " " + user.lastName;
      this.email = user.email;
      this.setName();
      this.setEmail();
    }
  },
  methods: {
    setName() {
      this.$store.dispatch("Checkout/setCustomerName", this.name);
    },
    setEmail() {
      this.$store.dispatch("Checkout/setCustomerEmail", this.email);
    },
    setPhoneNo() {
      this.$store.dispatch("Checkout/setCustomerPhoneNo", this.phoneNo);
    },
    setAddressLine1() {
      this.$store.dispatch("Checkout/setCustomerAddressLine1", this.line1);
    },
    setAddressLine2() {
      this.$store.dispatch("Checkout/setCustomerAddressLine2", this.line2);
    },
    setAddressZipCode() {
      this.$store.dispatch("Checkout/setCustomerAddressZipCode", this.zipCode);
    },
    setAddressCity() {
      this.$store.dispatch("Checkout/setCustomerAddressCity", this.city);
    },
    setAddressDivision() {
      this.$store.dispatch(
        "Checkout/setCustomerAddressDivision",
        this.division
      );
    },
    setAddressCountry() {
      this.$store.dispatch("Checkout/setCustomerAddressCountry", this.country);
    },
  },
};
</script>

<style lang="scss" scoped></style>
