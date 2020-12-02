<template>
  <div class="a-profile">
    <TopHeader></TopHeader>
    <b-container>
      <b-row align-v="center">
        <b-col>
          <h1>Profile Settings</h1>
          <p>Change your profile settings here.</p>
        </b-col>
        <b-col>
          <img src="/img/svg/profile.svg" alt="" width="300" />
        </b-col>
      </b-row>
      <div>
        <b-card no-body>
          <b-tabs pills card>
            <!-- Profile Tab -->
            <b-tab title="Profile" active>
              <b-row>
                <b-col>
                  <b-form-input
                    v-model="fstoreProfile.name"
                    type="text"
                    placeholder="Full Name"
                  ></b-form-input>
                </b-col>
                <b-col>
                  <b-form-input
                    v-model="fstoreProfile.phone"
                    type="text"
                    placeholder="Phone"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-form-input
                class="mt-4"
                v-model="fstoreProfile.address"
                type="text"
                placeholder="Address"
              ></b-form-input>

              <b-row class="mt-4">
                <b-col cols="8">
                  <b-form-input
                    v-model="fstoreProfile.postcode"
                    type="text"
                    placeholder="Postcode"
                  ></b-form-input>
                </b-col>
                <b-col cols="4">
                  <b-button @click="updateStoreProfile" block variant="primary"
                    >Save Changes</b-button
                  >
                </b-col>
              </b-row>
            </b-tab>

            <!-- Account Settings Tab -->
            <b-tab title="Account Settings">
              <b-row>
                <b-col>
                  <b-form-input
                    v-model="profile2.username"
                    type="text"
                    placeholder="Username"
                  ></b-form-input>
                </b-col>
                <b-col>
                  <b-form-input
                    v-model="profile2.email"
                    type="text"
                    placeholder="Email"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col>
                  <b-form-input
                    v-model="profile2.newPass"
                    type="password"
                    placeholder="New Password"
                  ></b-form-input>
                </b-col>
                <b-col>
                  <b-form-input
                    v-model="profile2.confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-4">
                <b-col cols="8">
                  <input type="file" class="form-control" />
                  <!-- <b-form-file
                                        v-model="profile2.image"
                                        placeholder="Select an Image..."
                                    ></b-form-file> -->
                </b-col>
                <b-col cols="4">
                  <b-button @click="updateSecretProfile" block variant="primary"
                    >Save Changes</b-button
                  >
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
export default {
  name: "AProfile",
  components: {
    TopHeader
  },
  data() {
    return {
      profile2: {
        username: "",
        email: "",
        newPass: "",
        confirmPass: "",
        image: ""
      }
    };
  },
  methods: {
    updateSecretProfile() {
      console.log("authenticated profile update.");
    }
  }
};
</script>

<style lang="scss" scoped></style>
