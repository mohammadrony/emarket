<template>
  <div>
    <TopHeader></TopHeader>

    <b-container class="mt-4">
      <div v-if="userId != 0">
        <b-tabs nav-wrapper-class="w-25" lazy vertical pills card>
          <b-tab title="Profile" active>
            <b-row>
              <b-col>
                <h5>Public profile</h5>
              </b-col>
            </b-row>
            <hr class="my-2" />
            <b-row>
              <b-col cols="7">
                <div class="mt-3">
                  <strong>Name</strong>
                </div>
                <div class="mt-1">
                  {{ user.firstName }} {{ user.lastName }}
                  <b-button variant="white" class="ml-1" size="sm">
                    <b-icon
                      v-b-tooltip.hover
                      title="edit"
                      @click="changeName"
                      icon="pen"
                    ></b-icon>
                  </b-button>
                </div>
                <div v-if="user.username">
                  <div class="mt-3">
                    <strong>Username</strong>
                  </div>
                  <div class="mt-1">
                    {{ user.username }}
                    <b-button variant="white" class="ml-1" size="sm">
                      <b-icon
                        v-b-tooltip.hover
                        title="edit"
                        @click="changeUserName"
                        icon="pen"
                      ></b-icon>
                    </b-button>
                  </div>
                </div>
                <div class="mt-3">
                  <strong>Email</strong>
                </div>
                <div class="mt-1">
                  {{ user.email }}
                </div>
                <div class="mt-3">
                  <strong>Password</strong>
                </div>
                <div class="mt-1">
                  ************
                  <b-button
                    v-b-modal.modalUpdatePassword
                    variant="white"
                    class="ml-1"
                    size="sm"
                  >
                    <b-icon
                      v-b-tooltip.hover
                      title="change password"
                      icon="pen"
                    ></b-icon>
                  </b-button>
                </div>
                <b-modal
                  title="Change password"
                  id="modalUpdatePassword"
                  hide-footer
                >
                  <b-form>
                    <b-form-group
                      id="input-group-current-password"
                      label="Current Password"
                      label-for="input-current-password"
                    >
                      <b-form-input
                        v-model="currentPassword"
                        id="input-current-password"
                        type="password"
                        @keyup.enter="updatePassword"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-new-password"
                      label="New Password"
                      label-for="input-new-password"
                    >
                      <b-form-input
                        v-model="newPassword"
                        id="input-new-password"
                        type="password"
                        @keyup.enter="updatePassword"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-confirm-password"
                      label="Confirm Password"
                      label-for="input-confirm-password"
                    >
                      <b-form-input
                        v-model="confirmPassword"
                        id="input-confirm-password"
                        type="password"
                        @keyup.enter="updatePassword"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-row class="mt-4">
                      <b-col cols="4"></b-col>
                      <b-col cols="4">
                        <b-button block variant="danger">
                          Reset
                        </b-button>
                      </b-col>
                      <b-col cols="4">
                        <b-button block variant="success">Submit</b-button>
                      </b-col>
                    </b-row>
                  </b-form>
                </b-modal>
                <div class="mt-4">
                  <b-button variant="outline-danger">
                    Close my account
                  </b-button>
                </div>
              </b-col>
              <b-col cols="5">
                <b-img
                  rounded="circle"
                  width="230px"
                  height="auto"
                  :src="user.profileImage"
                ></b-img>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Your Review"><p>I'm the second tab</p></b-tab>
        </b-tabs>
      </div>
      <div class="my-5" v-if="userId == 0">
        <br>
        <br>
        <br>
        User not found...
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import AuthenticationService from "@/services/AuthenticationService.js";
export default {
  name: "Profile",
  components: {
    TopHeader,
    Footer
  },
  data() {
    return {
      userId: 0,
      firstName: "",
      lastName: "",
      userName: "",
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
      user: {}
    };
  },
  async mounted() {
    this.userId = this.$store.state.userId;
    if (this.userId != 0) {
      try {
        this.user = (await AuthenticationService.user(this.userId)).data;
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  },
  methods: {
    changeName() {
      console.log("change name");
    },
    changeUserName() {
      console.log("change user name");
    },
    async updatePassword() {
      try {
        const response = (
          await AuthenticationService.updatePassword({
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
          })
        ).data;
        console.log(response);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.profile_sidemenu {
  border: 1px;
  border-color: #234232;
}
</style>
