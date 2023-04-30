<template>
  <div>
    <ATopHeader></ATopHeader>
    <b-container class="mt-2">
      <b-row>
        <b-col class="text-center">
          <h3>Users</h3>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col>
          <b-row>
            <b-col cols="8" />
            <b-col cols="4">
              <b-form inline @submit.prevent="search">
                <b-form-input
                  v-model="searchUserText"
                  size=""
                  class="mr-sm-2"
                  placeholder="Search user..."
                  @keyup.enter="search"
                />
                <b-button @click="search" variant="white">
                  <b-icon icon="search"></b-icon
                ></b-button>
              </b-form>
            </b-col>
          </b-row>

          <div v-if="users != 0">
            <hr />
            <div>
              <b-row>
                <b-col> </b-col>
                <b-col>
                  <strong>Email</strong>
                </b-col>
                <b-col>
                  <strong>Name</strong>
                </b-col>
                <b-col>
                  <strong>Phone No.</strong>
                </b-col>
                <b-col class="text-center">
                  <strong>Status</strong>
                  <b-dropdown
                    size="sm"
                    id="dropdown-left"
                    :text="selectedTypeName"
                    :variant="selectedTypeVariant"
                    class="ml-2"
                  >
                    <b-dropdown-item @click="selectType(anyType)">
                      {{ anyType.name }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-for="(status, idx) in userStatus"
                      :key="idx"
                      @click="selectType(status)"
                    >
                      {{ status.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-col>
              </b-row>
              <hr />
            </div>

            <div v-for="user in secondUserList" :key="user.id">
              <b-row>
                <b-col>
                  <b-img
                    height="80px"
                    :src="user.profileImage"
                    alt="No Image"
                  />
                </b-col>
                <b-col>
                  {{ user.email }}
                </b-col>
                <b-col>{{ user.firstName }} {{ user.lastName }}</b-col>
                <b-col>{{ user.phoneNo }}</b-col>
                <b-col>
                  <b-row>
                    <b-col cols="7">
                      <b-button
                        size="sm"
                        block
                        v-if="user.id == 1"
                        :variant="user.variant"
                        >{{ user.userType }}</b-button
                      >
                      <b-dropdown
                        size="sm"
                        block
                        v-if="user.id != 1"
                        id="dropdown-left"
                        :text="user.userType"
                        :variant="user.variant"
                      >
                        <b-dropdown-item
                          v-for="(status, idx) in userStatus"
                          :key="idx"
                          @click="updateStatus(user, status)"
                        >
                          {{ status.name }}
                        </b-dropdown-item>
                      </b-dropdown>
                    </b-col>
                    <b-col cols="5">
                      <b-button
                        size="sm"
                        block
                        variant="danger"
                        v-if="user.id != userId && user.id != 1"
                        @click="deleteAccount(user)"
                      >
                        Delete
                      </b-button>
                      <b-button
                        size="sm"
                        block
                        to="/admin/profile"
                        v-if="user.id == userId"
                        variant="info"
                      >
                        Profile
                      </b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <hr />
            </div>
          </div>
          <div class="m-4 d-flex justify-content-center" v-if="users == 0">
            <h3>User not found...</h3>
          </div>
          <b-pagination
            v-if="users != 0"
            size="lg"
            v-model="currentPage"
            :total-rows="users"
            :per-page="perPage"
            @input="paginate(currentPage)"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>
<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
import UserService from "@/services/UserService.js";
import ReviewService from "@/services/ReviewService.js";
export default {
  name: "AUsers",
  components: {
    ATopHeader,
    MyFooter,
  },
  data() {
    return {
      anyType: {
        name: "All",
        variant: "dark",
      },
      userId: 0,
      selectedTypeName: "All",
      selectedTypeVariant: "dark",
      searchUserText: "",
      users: 0,
      secondUserList: [],
      userList: [],
      userList2: [],
      userStatus: [
        {
          name: "Admin",
          priority: 1,
          description: "Owner of this system.",
          variant: "dark",
        },
        {
          name: "Customer",
          priority: 2,
          description: "End user of the system.",
          variant: "warning",
        },
      ],
      currentPage: 1,
      perPage: 20,
    };
  },
  computed: {},

  async mounted() {
    try {
      this.userId = this.$store.state.CurrentUser.userId;
      this.userList = (await UserService.getUserList()).data;
      this.userList2 = this.userList.slice();
      if (this.userList2) {
        this.users = this.userList2.length;
        const start = 0;
        this.secondUserList = this.userList2.slice(start, start + this.perPage);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  },

  methods: {
    search() {
      if (this.selectedTypeName != "All") {
        this.userList2 = this.userList2.filter((val) => {
          return val.userType
            .toLowerCase()
            .includes(this.selectedTypeName.toLowerCase());
        });
      }
      this.userList2 = this.userList2.filter((val) => {
        return (
          val.firstName
            .toLowerCase()
            .includes(this.searchUserText.toLowerCase()) ||
          val.lastName
            .toLowerCase()
            .includes(this.searchUserText.toLowerCase()) ||
          val.email.toLowerCase().includes(this.searchUserText.toLowerCase())
        );
      });
      this.users = this.userList2.length;
      const start = 0;
      this.secondUserList = this.userList2.slice(start, start + this.perPage);
    },
    selectType(status) {
      if (status.name == "All") {
        this.searchUserText = "";
        this.selectedTypeName = status.name;
        this.selectedTypeVariant = status.variant;
        this.userList2 = this.userList.slice();
      } else {
        this.selectedTypeName = status.name;
        this.selectedTypeVariant = status.variant;
        this.userList2 = this.userList.filter(
          (obj) => obj.userType == status.name
        );
      }
      this.users = this.userList2.length;
      const start = 0;
      this.secondUserList = this.userList2.slice(start, start + this.perPage);
    },
    async updateStatus(user, status) {
      const index = this.secondUserList.findIndex((obj) => obj.id === user.id);
      this.secondUserList[index].userType = status.name;
      this.secondUserList[index].variant = status.variant;
      await UserService.updateUser({
        id: user.id,
        userType: status.name,
        priority: status.priority,
        variant: status.variant,
      });
    },
    async deleteAccount(user) {
      var reviewList = [];
      try {
        reviewList = (await ReviewService.getUsersReviewList(user.id)).data;
      } catch (error) {
        console.log(error.response.data.error);
      }
      var i;
      for (i in reviewList) {
        await this.$store.dispatch("Review/deleteReview", reviewList[i]);
      }

      try {
        await UserService.deleteAccount(user.id);
        window.location.reload();
      } catch (error) {
        this.$bvToast.toast(error.response.data.error, {
          title: "Error deleting Account",
          variant: "danger",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true,
        });
        console.log(error.response.data.error);
      }
    },
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.secondUserList = this.userList2.slice(start, start + this.perPage);
    },
  },
};
</script>

<style lang="scss" scoped></style>
