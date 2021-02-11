<template>
  <div>
    <TopHeader></TopHeader>

    <b-container class="mt-4">
      <div v-if="userId != 0">
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
      <div class="my-5" v-if="userId == 0">
        <br />
        <br />
        <br />
        User not found...
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import UPublicProfile from "@/components/User/Profile/UPublicProfile.vue";
import UReviews from "@/components/User/Profile/UReviews.vue";
import UAccount from "@/components/User/Profile/UAccount.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Profile",
  components: {
    TopHeader,
    UPublicProfile,
    UReviews,
    UAccount,
    Footer
  },
  data() {
    return {
      userId: 0
    };
  },
  mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
    if (this.userId == 0) {
      window.location.replace("/");
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
</style>
