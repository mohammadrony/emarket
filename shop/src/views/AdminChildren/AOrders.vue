<template>
  <div class="a-orders">
    <ATopHeader></ATopHeader>
    <b-container>
      <b-row align-v="center">
        <b-col md="6">
          <h3>Orders Page</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
            at tempore alias repellendus maxime quasi soluta deserunt sunt dolor
            quidem cumque quam, dignissimos asperiores quae reiciendis nam rerum
            harum molestiae?
          </p>
        </b-col>
        <b-col md="6">
          <img src="/img/svg/orders.svg" alt="" width="300" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
export default {
  name: "AOrders",
  components: {
    ATopHeader
  }
};
</script>

<style lang="scss" scoped></style>
