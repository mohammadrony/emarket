<template>
  <div class="product-details">
    <b-modal
      id="productDetails"
      size="lg"
      hide-footer
      hide-header
      hide-header-close
    >
      <div>
        <carousel :perPage="1">
          <slide>
            <b-img
              :src="product.image"
              class="details-image"
              width="765"
            ></b-img>
          </slide>
        </carousel>
        <b-container>
          <b-row class="mt-2 d-flex justify-content-between" align-v="center">
            <h2>{{ product.title }}</h2>
            <h6>Price: {{ product.price }} taka</h6>
          </b-row>
          <b-row class="mt-2">
            <b-badge variant="dark">{{ product.tags }}</b-badge>
          </b-row>
        </b-container>
        <hr />
        <div class="mt-2">
          <h6>Description</h6>
          <hr />
          <p v-html="product.description"></p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ProductDetails",
  props: {
    product: Object
  }
};
</script>

<style scoped lang="scss">
</style>
