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
            <b-col cols="9"></b-col>
            <b-col cols="3">
              <b-form-group class="m-0">
                <b-form-input
                  placeholder="Search user..."
                  v-model="searchUserText"
                  @keyup.enter="search"
                >
                </b-form-input>
              </b-form-group>
              <b-button variant="white">
                <b-icon icon="search"></b-icon>
              </b-button>
            </b-col>
          </b-row>

          <div v-if="userCount != 0">
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
                <b-col>
                  <strong>Status</strong>
                </b-col>
              </b-row>
              <hr />
            </div>

            <div v-for="user in displayUsers" :key="user.id">
              <b-row>
                <b-col>
                  <img
                    class="product-image"
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
                  <div>
                    <b-button variant="warning" @click="userType(user)"
                      >Edit</b-button
                    >
                    <b-button
                      variant="danger"
                      class="ml-4"
                      @click="deleteUser(user)"
                      >Delete</b-button
                    >
                  </div>
                </b-col>
              </b-row>
              <hr />
            </div>
          </div>
          <div class="m-4 d-flex justify-content-center" v-if="userCount == 0">
            <h3>User not found...</h3>
          </div>
          <b-pagination
            v-if="userCount != 0"
            size="lg"
            v-model="currentPage"
            :total-rows="userCount"
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
import { mapState } from "vuex";
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "AUsers",
  components: {
    ATopHeader,
    Footer
  },
  data() {
    return {
      searchUserText: "",
      currentPage: 1
    };
  },
  computed: {
    ...mapState({
      userCount: state => state.Users.userCount,
      displayUsers: state => state.Users.displayUsers,
      perPage: state => state.Users.perPage
    })
  },

  async mounted() {
    try {
      await this.$store.dispatch("Users/setUserList");
    } catch (error) {
      console.log(error.response.data.error);
    }
  },

  methods: {
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
