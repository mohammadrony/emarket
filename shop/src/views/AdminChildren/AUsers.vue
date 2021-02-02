<template>
  <div>
    <ATopHeader></ATopHeader>
    <b-container>
      <b-row>
        <b-col class="text-center">
          <h3>Users</h3>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col>
          <b-row>
            <b-col cols="8"></b-col>
            <b-col cols="4">
              <b-form inline @submit.prevent="search">
                <b-form-input
                  v-model="searchUserText"
                  size=""
                  class="mr-sm-2"
                  placeholder="Search user..."
                  @keyup.enter="search"
                ></b-form-input>
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
                    <b-dropdown-item @click="selectType(anyType)">{{
                      anyType.name
                    }}</b-dropdown-item>
                    <b-dropdown-item
                      v-for="(status, idx) in orderStatus"
                      :key="idx"
                      @click="selectType(status)"
                      >{{ status.name }}</b-dropdown-item
                    >
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
                      <b-dropdown
                        size="sm"
                        block
                        id="dropdown-left"
                        text="user.status"
                        :variant="userVariant"
                      >
                        <b-dropdown-item
                          v-for="(status, idx) in orderStatus"
                          :key="idx"
                          @click="updateStatus(user, status)"
                          >{{ status.name }}</b-dropdown-item
                        >
                      </b-dropdown>
                    </b-col>
                    <b-col cols="5">
                      <b-button
                        size="sm"
                        block
                        variant="warning"
                        @click="orderDetails(user)"
                      >
                        Details
                      </b-button>
                    </b-col>
                  </b-row>
                  <!-- <div>
                    <b-button variant="warning" @click="userType(user)"
                      >Edit</b-button
                    >
                    <b-button
                      variant="danger"
                      class="ml-4"
                      @click="deleteUser(user)"
                      >Delete</b-button
                    >
                  </div> -->
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
    <Footer />
  </div>
</template>
<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import Footer from "@/components/Footer.vue";
import AuthenticationService from "../../services/AuthenticationService";
export default {
  name: "AUsers",
  components: {
    ATopHeader,
    Footer
  },
  data() {
    return {
      anyType: {
        name: "All",
        variant: "dark"
      },
      selectedTypeName: "All",
      selectedTypeVariant: "dark",
      searchUserText: "",
      users: 0,
      componentKey: 0,
      secondUserList: null,
      userList: null,
      userList2: null,
      orderStatus: [
        {
          name: "paid",
          variant: "dark"
        },
        {
          name: "processing",
          variant: "info"
        },
        {
          name: "on the way",
          variant: "warning"
        },
        {
          name: "complete",
          variant: "success"
        }
      ],
      currentPage: 1,
      perPage: 20
    };
  },
  computed: {
    userVariant: function(event) {
      console.log(event);
      const info = "info";
      return info;
    }
  },

  async mounted() {
    try {
      this.userList = (await AuthenticationService.getUserList()).data;
      this.userList2 = this.userList.slice();
      if (this.userList2) {
        this.users = this.userList2.length;
        const start = 0;
        this.secondUserList = this.userList2.slice(start, start + this.perPage);
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //   await this.$store.dispatch("Users/setUserList");
    // } catch (error) {
    //   console.log(error.response.data.error);
    // }
  },

  methods: {
    selectType(status) {
      if (status.name == "All") {
        this.selectedTypeName = status.name;
        this.selectedTypeVariant = status.variant;
        this.orderList2 = this.orderList.slice();
      } else {
        this.selectedTypeName = status.name;
        this.selectedTypeVariant = status.variant;
        this.orderList2 = this.orderList.filter(
          obj => obj.status == status.name
        );
      }
      this.orders = this.orderList2.length;
      const start = 0;
      this.secondOrderList = this.orderList2.slice(start, start + this.perPage);
    },
    async updateStatus(user, status) {
      const index = this.displayUsers.findIndex(obj => obj.id === user.id);
      this.displayUsers[index].status = status.name;
      this.displayUsers[index].variant = status.variant;
      await AuthenticationService.updateOrder({
        id: user.id,
        status: status.name,
        variant: status.variant
      });
    },
    orderDetails(user) {
      const route = "/admin/order/" + user.id;
      window.location.replace(route);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    userType(type) {
      console.log(type);
    },
    deleteUser(user) {
      console.log(user);
    },
    search() {
      this.$store.dispatch("Users/searchUser", { text: this.searchUserText });
    },
    paginate(currentPage) {
      this.$store.dispatch("Users/paginate", currentPage);
    }
  }
};
</script>

<style lang="scss" scoped>
.danger-alert {
  color: red;
}

.product-image {
  width: 66%;
  margin: 0, auto;
}

.table-header {
  background: cornflowerblue;
  padding: 0;
  margin: 0;
}
</style>
