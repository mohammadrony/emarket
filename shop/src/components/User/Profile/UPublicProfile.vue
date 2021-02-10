<template>
  <div>
    <b-row>
      <b-col>
        <h5>Public profile</h5>
      </b-col>
    </b-row>
    <hr class="my-2" />
    <b-row class="mt-3">
      <b-col cols="7">
        <div>
          <strong>Name</strong>
          <b-badge
            pill
            class="ml-2"
            v-if="user.priority == 1"
            variant="success"
          >
            <b-icon icon="check-circle-fill"></b-icon>
            Admin
          </b-badge>
        </div>
        <div class="mt-1" v-if="editName == 0">
          {{ user.firstName }} {{ user.lastName }}
          <b-button @click="changeName" variant="white" class="ml-1" size="sm">
            <b-icon
              v-b-tooltip.hover
              title="change name"
              scale="0.8"
              icon="pen"
            ></b-icon>
          </b-button>
        </div>

        <div v-if="editName == 1">
          <b-form @submit.stop.prevent="updateName">
            <b-row class="mt-2">
              <b-col>
                <b-form-input
                  size="sm"
                  placeholder="First Name"
                  v-model="firstName"
                  required
                >
                </b-form-input>
              </b-col>
              <b-col>
                <b-form-input
                  size="sm"
                  placeholder="Last Name"
                  v-model="lastName"
                  required
                >
                </b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col>
                <b-button size="sm" type="submit" variant="warning">
                  Save
                </b-button>
                <b-button
                  class="ml-2"
                  @click="editName ^= 1"
                  size="sm"
                  variant="outline-danger"
                  >Cancel</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </div>

        <div v-if="user.username">
          <div class="mt-3">
            <strong>Username</strong>
          </div>
          <div class="mt-1" v-if="editUserName == 0">
            {{ user.username }}
            <b-button
              @click="changeUserName"
              variant="white"
              class="ml-1"
              size="sm"
            >
              <b-icon
                v-b-tooltip.hover
                title="change username"
                scale="0.8"
                icon="pen"
              ></b-icon>
            </b-button>
          </div>
          <div v-if="editUserName == 1">
            <b-form @submit.stop.prevent="updateUserName">
              <b-row max-cols="6" class="mt-2">
                <b-col cols="6">
                  <b-form-input
                    size="sm"
                    placeholder="Username"
                    v-model="userName"
                    required
                  >
                  </b-form-input>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <b-button size="sm" type="submit" variant="warning">
                    Save
                  </b-button>
                  <b-button
                    class="ml-2"
                    @click="editUserName ^= 1"
                    size="sm"
                    variant="outline-danger"
                    >Cancel</b-button
                  >
                </b-col>
              </b-row>
            </b-form>
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
          ********
          <b-button
            v-b-modal.modalUpdatePassword
            variant="white"
            class="ml-1"
            size="sm"
          >
            <b-icon
              v-b-tooltip.hover
              title="change password"
              scale="0.8"
              icon="pen"
            ></b-icon>
          </b-button>
        </div>
        <b-modal title="Change password" id="modalUpdatePassword" hide-footer>
          <b-form @reset="resetField" @submit.stop.prevent="updatePassword">
            <b-form-group
              id="input-group-current-password"
              label="Current Password"
              label-for="input-current-password"
            >
              <b-form-input
                v-model="currentPassword"
                id="input-current-password"
                type="password"
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
                required
              ></b-form-input>
            </b-form-group>
            <b-row class="mt-4">
              <b-col cols="4"></b-col>
              <b-col cols="4">
                <b-button type="reset" block variant="danger">
                  Reset
                </b-button>
              </b-col>
              <b-col cols="4">
                <b-button block type="submit" variant="success"
                  >Submit</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </b-modal>
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
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
export default {
  name: "UPublicProfile",
  components: {},
  data() {
    return {
      user: {},
      editName: 0,
      editUserName: 0,
      userId: 0,
      firstName: "",
      lastName: "",
      userName: "",
      currentPassword: null,
      newPassword: null,
      confirmPassword: null
    };
  },
  mounted() {
    this.user = this.$store.state.CurrentUser.user;
  },
  methods: {
    changeName() {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.editName ^= 1;
      console.log("change name");
    },
    async updateName() {
      await AuthenticationService.updateUser({
        id: this.user.id,
        firstName: this.firstName,
        lastName: this.lastName
      });
      this.editName ^= 1;
      window.location.reload();
    },
    async updateUserName() {
      await AuthenticationService.updateUser({
        id: this.user.id,
        username: this.firstName
      });
      this.editUserName ^= 1;
      window.location.reload();
    },
    changeUserName() {
      this.userName = this.user.username;
      this.editUserName ^= 1;
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
    },
    resetField() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    }
  },
  computed: {}
};
</script>

<style lang="sass" scoped>
</style>