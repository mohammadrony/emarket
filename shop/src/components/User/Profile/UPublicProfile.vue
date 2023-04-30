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
            <b-icon icon="check-circle-fill" />
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
            />
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
                />
              </b-col>
              <b-col>
                <b-form-input
                  size="sm"
                  placeholder="Last Name"
                  v-model="lastName"
                  required
                />
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
                >
                  Cancel
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>

        <div>
          <div class="mt-3">
            <strong>Username</strong>
            <b-button
              v-if="!user.username"
              @click="changeUserName"
              variant="white"
              class="ml-1"
              size="sm"
            >
              <b-icon
                v-b-tooltip.hover
                title="Add username"
                scale="0.8"
                icon="pen"
              />
            </b-button>
          </div>
          <div class="mt-1" v-if="user.username && editUserName == 0">
            {{ user.username }}
            <b-button
              @click="changeUserName"
              variant="white"
              class="ml-1"
              size="sm"
            >
              <b-icon
                v-b-tooltip.hover
                title="Change username"
                scale="0.8"
                icon="pen"
              />
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
                    debounce="500"
                    @update="checkUserName"
                    :state="userNameValidation"
                    required
                  />
                  <b-form-valid-feedback :state="userNameValidation">
                    This username is available.
                  </b-form-valid-feedback>
                  <b-form-invalid-feedback :state="userNameValidation">
                    {{ userNameMessage }}
                  </b-form-invalid-feedback>
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
                  >
                    Cancel
                  </b-button>
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
            />
          </b-button>
        </div>
        <b-modal
          @shown="$refs.currentPasswordField.focus()"
          title="Change password"
          id="modalUpdatePassword"
          hide-footer
        >
          <b-form
            @reset="resetPasswordField"
            @submit.stop.prevent="updatePassword"
          >
            <b-form-group
              id="input-group-current-password"
              label="Current Password"
              label-for="input-current-password"
            >
              <b-form-input
                v-model="currentPassword"
                id="input-current-password"
                type="password"
                ref="currentPasswordField"
                :state="validCurrentPassword && currentPasswordValidation"
                required
              />
              <b-form-invalid-feedback
                v-if="currentPassword"
                :state="validCurrentPassword && currentPasswordValidation"
              >
                {{ currentPasswordMessage }}
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-if="!currentPassword"
                :state="validCurrentPassword && currentPasswordValidation"
              >
                Current password field can't be empty!
              </b-form-invalid-feedback>
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
                :state="newPasswordValidation"
                required
              />

              <b-form-invalid-feedback
                v-if="newPassword"
                :state="newPasswordValidation"
              >
                New password must have 8-32 character long, contain letters,
                numbers and must not contain space.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-if="!newPassword"
                :state="newPasswordValidation"
              >
                Password field can't be empty!
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-confirm-password"
              label="Confirm Password"
              label-for="input-confirm-password"
            >
              <b-form-input
                v-model="confirmPassword"
                id="input-confirm-password"
                :state="confirmPasswordValidation"
                type="password"
                required
              />
              <b-form-invalid-feedback
                v-if="confirmPassword"
                :state="confirmPasswordValidation"
              >
                Password didn't match
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-if="!confirmPassword"
                :state="confirmPasswordValidation"
              >
                Password field can't be empty!
              </b-form-invalid-feedback>
            </b-form-group>
            <b-row class="mt-4">
              <b-col cols="4" />
              <b-col cols="4">
                <b-button type="reset" block variant="danger"> Reset </b-button>
              </b-col>
              <b-col cols="4">
                <b-button block type="submit" variant="success">
                  Submit
                </b-button>
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
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
import UserService from "@/services/UserService.js";
export default {
  name: "UPublicProfile",
  components: {},
  data() {
    return {
      user: {},
      userId: 0,
      editName: 0,
      lastName: "",
      userName: "",
      firstName: "",
      editUserName: 0,
      formatUserName: /^[a-zA-Z0-9]{6,20}$/,
      formatPassword: /^[a-zA-z0-9]{8,32}$/,
      userNameMessage: "",
      userNameValidation: null,
      validCurrentPassword: true,
      currentPasswordMessage: "",
      newPasswordMessage: "",
      confirmPasswordMessage: "",
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
    };
  },
  computed: {
    currentPasswordValidation() {
      if (this.currentPassword == "") return false;
      else return null;
    },
    newPasswordValidation() {
      if (this.newPassword == null) return null;
      else if (!this.formatPassword.test(this.newPassword)) {
        return false;
      } else return true;
    },
    confirmPasswordValidation() {
      if (this.confirmPassword == null) return null;
      else if (
        this.newPassword != this.confirmPassword ||
        !this.formatPassword.test(this.confirmPassword)
      ) {
        return false;
      } else return true;
    },
  },
  async mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
    try {
      this.user = (await UserService.getUserById(this.userId)).data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  methods: {
    changeName() {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.editName ^= 1;
    },
    async updateName() {
      try {
        await UserService.updateUser({
          id: this.user.id,
          firstName: this.firstName,
          lastName: this.lastName,
        });
        this.$store.dispatch("CurrentUser/setName", {
          firstName: this.firstName,
          lastName: this.lastName,
        });
        this.editName ^= 1;
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    changeUserName() {
      this.userName = this.user.username;
      this.editUserName ^= 1;
    },
    async checkUserName() {
      if (this.userName == this.user.username) {
        return true;
      } else if (!this.formatUserName.test(this.userName)) {
        this.userNameValidation = false;
        this.userNameMessage =
          "Your username must be 6-20 characters using alphabets and numbers";
        return false;
      }
      try {
        const response = (await UserService.checkUserName(this.userName)).data;
        this.userNameValidation = response.userNameAvailable;
        if (response.userNameAvailable == true) {
          this.userNameMessage = "";
          return true;
        } else {
          this.userNameMessage = "This username is not available";
          return false;
        }
      } catch (error) {
        this.userNameValidation = false;
        this.userNameMessage = error.response.data.error;
        console.log(error.response.data.error);
      }
    },
    async updateUserName() {
      if (
        !(await this.checkUserName()) ||
        this.userName == this.user.username
      ) {
        return;
      }
      try {
        await UserService.updateUser({
          id: this.user.id,
          username: this.userName,
        });
        this.$store.dispatch("CurrentUser/setUserName", this.userName);
        this.editUserName ^= 1;
        window.location.reload();
      } catch (error) {
        this.userNameValidation = false;
        this.userNameMessage = error.response.data.error;
        console.log(error.response.data.error);
      }
    },
    resetPasswordField() {
      this.currentPassword = "";
      this.newPassword = null;
      this.confirmPassword = null;
    },
    async updatePassword() {
      var correctPassword = false;
      try {
        correctPassword = (
          await AuthenticationService.verifyPassword(this.currentPassword)
        ).data.correctPassword;
      } catch (error) {
        this.validCurrentPassword = false;
        this.currentPasswordMessage = error.response.data.error;
      }
      if (
        correctPassword &&
        this.newPasswordValidation &&
        this.confirmPasswordValidation
      ) {
        try {
          await AuthenticationService.updatePassword({
            password: this.newPassword,
          });
          window.location.reload();
        } catch (error) {
          this.validCurrentPassword = false;
          this.currentPasswordMessage = error.response.data.error;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
