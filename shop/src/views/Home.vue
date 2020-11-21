<template>
  <div>
    <b-container class="first-element">
      <b-row align-v="center">
        <b-col md="6" class="left-align">
          <h3>Website Title</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reiciendis, earum!
          </p>
          <b-button to="/" variant="info" class="m-3">Link</b-button>
          <b-button to="/products" variant="outline-info">
            Our Products
          </b-button>
        </b-col>
        <b-col md="6">
          <img src="/img/svg/graphic.svg" width="400" />
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mt-5 home-products">
      <div v-if="showSpinner" class="spinner">
        <b-spinner variant="primary"></b-spinner>
      </div>
      <b-row>
        <b-col v-for="product in displayProducts" :key="product.id">
          <b-card img-top tag="article" style="max-width: 21rem" class="mb-2">
            <b-card-img
              class="card-image"
              :src="product.image"
              alt="Image Field"
            ></b-card-img>

            <h4 class="m-3">{{ product.title }}</h4>
            <b-row>
              <b-col></b-col>
              <b-col>Price: {{ product.price }}</b-col>
            </b-row>

            <b-row>
              <b-col cols="4">
                <b-button class="m-2" @click="showModal(product)" variant="info"
                  >Details</b-button
                >
              </b-col>
              <b-col cols="2" />
              <b-col cols="6">
                <AddToCart
                  :id="product.id"
                  :title="product.title"
                  :price="product.price"
                ></AddToCart>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-4" align-h="center">
        <b-button variant="primary" size="lg" to="products"
          >More Products</b-button
        >
      </b-row>
    </b-container>
    
    <ProductDetails :product="product"/>

    <b-container class="first-element mt-5">
      <b-row align-v="center">
        <b-col md="6">
          <img src="/img/pro/CSE_KU_logo.png" width="400" />
        </b-col>
        <b-col md="6" class="left-align">
          <h3>Developers</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
            voluptas.
          </p>
          <b-button to="/about" variant="success" size="lg">
            About Us
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <div class="footer mt-5">
      <h1>Footer</h1>
      <h1>Footer</h1>
      <h1>Footer</h1>
      <h1>Footer</h1>
      <h1>Footer</h1>
      <h1>Footer</h1>
      <h1>Footer</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddToCart from "@/components/AddToCart.vue";
import ProductDetails from "@/components/Modal/ProductDetails.vue";
import ProductsService from "../services/ProductsService";
export default {
  name: "Home",
  components: {
    AddToCart, 
    ProductDetails
  },
  data() {
    return {
      showSpinner: null,
      product: {},
      homeProducts: null,
      displayProducts: null
    };
  },
  async mounted() {
    this.showSpinner = true;
    this.homeProducts = (await ProductsService.getHomeProducts()).data;
    this.displayProducts = this.homeProducts;
    this.showSpinner = false;
  },
  methods: {
    showModal(product) {
      this.product = product;
      this.$bvModal.show("productDetails");
    }
  }
};
</script>

<style lang="scss" scoped>
.left-align {
  text-align: left;
}
.first-element {
  background-color: #bebdbd;
}
.footer {
  color: white;
  background-color: darkslategray;
}
.spinner {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(235, 131, 235, 0.2);
}
.home-products {
  background-color: white;
}
.card-image {
  max-width: 20rem;
  min-height: 20rem;
}
.details-image {
  max-height: 30rem;
}
</style>
