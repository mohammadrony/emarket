<template>
  <div>
    <ATopHeader></ATopHeader>
    <b-container class="mt-4">
      <b-row>
        <b-col class="text-center">
          <h3>Admins Order Page</h3>
        </b-col>
      </b-row>
      <hr />
      <div v-if="orders != 0">
        <b-row>
          <b-col cols="1" class="text-center">
            <strong>ID</strong>
          </b-col>
          <b-col cols="3">
            <strong>Full Name</strong>
          </b-col>
          <b-col cols="3">
            <strong>Email</strong>
          </b-col>
          <b-col cols="2">
            <strong>Order Price</strong>
          </b-col>
          <b-col cols="3" class="text-center">
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
                v-for="(status, idx) in orderStatus"
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
      <div>
        <div v-for="order in secondOrderList" :key="order.id">
          <b-row>
            <b-col cols="1" class="text-center">{{ order.id }}</b-col>
            <b-col cols="3">{{ order.name }}</b-col>
            <b-col cols="3">{{ order.email }}</b-col>
            <b-col cols="2">
              {{ order.productCost + order.shippingCost }} {{ order.currency }}
            </b-col>
            <b-col cols="3" class="text-center">
              <b-row>
                <b-col cols="7">
                  <b-dropdown
                    size="sm"
                    block
                    id="dropdown-left"
                    :text="order.status"
                    :variant="order.variant"
                  >
                    <b-dropdown-item
                      v-for="(status, idx) in orderStatus"
                      :key="idx"
                      @click="updateStatus(order, status)"
                    >
                      {{ status.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-col>
                <b-col cols="5">
                  <b-button
                    size="sm"
                    block
                    variant="warning"
                    :to="`/admin/order/${order.id}`"
                  >
                    Details
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <hr />
        </div>
      </div>
      <div class="mt-5 d-flex justify-content-center" v-if="orders == 0">
        <h3>Order not found...</h3>
      </div>
      <b-pagination
        v-if="orders != 0"
        size="md"
        v-model="currentPage"
        :total-rows="orders"
        :per-page="perPage"
        @input="paginate(currentPage)"
      ></b-pagination>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import OrderService from "@/services/OrderService.js";
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "AOrders",
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
      selectedTypeName: "All",
      selectedTypeVariant: "dark",
      orders: 0,
      secondOrderList: null,
      orderList: null,
      orderList2: null,
      orderStatus: [
        {
          name: "paid",
          variant: "dark",
        },
        {
          name: "preparing",
          variant: "info",
        },
        {
          name: "on the way",
          variant: "warning",
        },
        {
          name: "complete",
          variant: "success",
        },
      ],
      currentPage: 1,
      perPage: 20,
    };
  },
  async mounted() {
    try {
      this.orderList = (await OrderService.getOrderList()).data;
      this.orderList2 = this.orderList.slice();
      if (this.orderList2) {
        this.orders = this.orderList2.length;
        const start = 0;
        this.secondOrderList = this.orderList2.slice(
          start,
          start + this.perPage
        );
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
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
          (obj) => obj.status == status.name
        );
      }
      this.orders = this.orderList2.length;
      const start = 0;
      this.secondOrderList = this.orderList2.slice(start, start + this.perPage);
    },
    async updateStatus(order, status) {
      const index = this.secondOrderList.findIndex(
        (obj) => obj.id === order.id
      );
      this.secondOrderList[index].status = status.name;
      this.secondOrderList[index].variant = status.variant;
      await OrderService.updateOrder({
        id: order.id,
        status: status.name,
        variant: status.variant,
      });
    },
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.secondOrderList = this.orderList2.slice(start, start + this.perPage);
    },
  },
};
</script>

<style lang="scss" scoped></style>
