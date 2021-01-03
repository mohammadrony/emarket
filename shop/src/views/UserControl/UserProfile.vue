<template>
  <div class="user-profile">
    <TopHeader></TopHeader>
    <b-row class="mt-2">
      <b-col cols="1"></b-col>
      <b-col cols="2">
        <b-list-group>
          <b-list-group-item>
            <b-img
              rounded="circle"
              height="50"
              width="50"
              src="https://picsum.photos/300/150/?image=41"
            ></b-img>
            <h3 class="mt-2">John</h3>
            <h6>Personal settings</h6>
          </b-list-group-item>
          <b-list-group-item to="/" active>Profile</b-list-group-item>
          <b-list-group-item>Account</b-list-group-item>
          <b-list-group-item>Account security</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="5">
        <h3>Your Profile</h3>
        <hr />
        <h6>Your Name</h6>
        <b-form inline class="mb-4">
          <label class="sr-only" for="first-name">Name</label>
          <b-form-input
            id="first-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="First Name"
          ></b-form-input>

          <label class="sr-only" for="last-name"
            >Username</label
          >
          <b-input-group  class="mb-2 mb-sm-0">
            <b-form-input
              id="lastname"
              placeholder="Last Name"
            ></b-form-input>
          </b-input-group>


        </b-form>

        <b-form-group id="input-group-2" label="Username" label-for="input-2">
          <b-form-input
            id="input-2"
            placeholder="Username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <!-- <b-form
          inline
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <label for="text-password">Password</label>
          <b-form-input
            id="input-1"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
          <b-input-group class="ml-4">
            <label for="text-password">Password</label>
            <b-form-input
              id="inline-form-input-username"
              placeholder="Username"
            ></b-form-input>
          </b-input-group>
        </b-form> -->
      </b-col>
      <b-col cols="3">
        <b-img
          rounded="circle"
          height="250"
          width="250"
          src="https://picsum.photos/300/150/?image=41"
        ></b-img>
      </b-col>
      <b-col cols="1"></b-col>
    </b-row>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
export default {
  name: "UserProfile",
  components: {
    TopHeader,
  },
};
</script>

<style scoped lang="scss">
.profile_sidemenu {
  border: 1px;
  border-color: #234232;
}
</style>
