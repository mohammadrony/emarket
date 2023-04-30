<template>
  <div>
    <ATopHeader></ATopHeader>
    <b-container class="mt-4">
      <div>
        <b-tabs nav-wrapper-class="w-25" vertical pills card>
          <b-tab title="Profile" active>
            <UPublicProfile />
          </b-tab>
          <b-tab lazy title="Reviews">
            <UReviews />
          </b-tab>
          <b-tab lazy title="Account">
            <UAccount />
          </b-tab>
        </b-tabs>
      </div>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import UPublicProfile from "@/components/User/Profile/UPublicProfile.vue";
import UReviews from "@/components/User/Profile/UReviews.vue";
import UAccount from "@/components/User/Profile/UAccount.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "AProfile",
  components: {
    ATopHeader,
    UPublicProfile,
    UReviews,
    UAccount,
    MyFooter,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
