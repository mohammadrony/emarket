<template>
  <div class="admin">
    <ATopHeader></ATopHeader>
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
  </div>
</template>

<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
export default {
  name: "Admin",
  components: {
    ATopHeader
  }
};
</script>

<style lang="scss" scoped>
.left-align {
  text-align: left;
}
</style>
