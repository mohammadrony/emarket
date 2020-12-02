<template>
  <div class="admin">
    <TopHeader></TopHeader>
    <b-container class="mb-5">
      <b-row>
        <b-col>
          <b-card>
            <b-button block to="/admin/overview" variant="outline-info"
              >Admin Overview</b-button
            >
          </b-card>
        </b-col>
        <b-col>
          <b-card>
            <b-button block to="/admin/products" variant="outline-info"
              >Admin Products</b-button
            >
          </b-card>
        </b-col>
        <b-col>
          <b-card>
            <b-button block to="/admin/orders" variant="outline-info"
              >Admin Orders</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
export default {
  name: "Admin",
  components: {
    TopHeader
  }
};
</script>

<style lang="scss" scoped>
.left-align {
  text-align: left;
}
</style>
