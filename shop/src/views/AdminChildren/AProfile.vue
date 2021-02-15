<template>
  <div class="a-profile">
    <ATopHeader></ATopHeader>
    <b-container class="mt-4">
      <div v-if="userId != 0">
        <b-tabs nav-wrapper-class="w-25" vertical pills card>
          <b-tab title="Profile" active>
            <UPublicProfile />
          </b-tab>
          <b-tab lazy title="Company">
            <CompanyProfile />
          </b-tab>
        </b-tabs>
      </div>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import UPublicProfile from "@/components/User/Profile/UPublicProfile.vue";
import CompanyProfile from "@/components/Admins/Profile/CompanyProfile.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "AProfile",
  components: {
    ATopHeader,
    UPublicProfile,
    CompanyProfile,
    Footer
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
