<template>
  <div>
    <TopHeader />
    <b-container class="mt-4">
      <b-row>
        <b-col class="text-center">
          <h3>Before You Pay Us</h3>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="6">
          <AddressForm />
        </b-col>
        <b-col cols="6">
          <BuyItem />
        </b-col>
      </b-row>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import AddressForm from "@/components/Checkout/AddressForm.vue";
import BuyItem from "@/components/Checkout/BuyItem.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "Checkout",
  components: {
    TopHeader,
    AddressForm,
    BuyItem,
    MyFooter,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss"></style>
