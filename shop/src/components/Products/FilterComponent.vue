<template>
  <div>
    <b-form inline>
      Price
      <b-form-input
        @keyup.enter="priceFilter"
        v-model="minPrice"
        class="ml-2 mr-2"
        placeholder="Min"
      ></b-form-input>
      To
      <b-form-input
        @keyup.enter="priceFilter"
        v-model="maxPrice"
        class="ml-2"
        placeholder="Max"
      ></b-form-input>
      <b-button @click="priceFilter" class="ml-2" variant="outline-info">
        <b-icon-filter></b-icon-filter>
        Filter
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  components: {},
  data() {
    return {
      minPrice: null,
      maxPrice: null
    };
  },
  mounted() {
    this.minPrice = this.$store.state.route.query.lo;
    this.maxPrice = this.$store.state.route.query.hi;
  },
  computed: {},
  methods: {
    priceFilter() {
      const route = this.$store.state.route;
      var newRoute = route.path;
      if (route.query.q) {
        newRoute += "?q=" + route.query.q;
      }
      if (this.minPrice) {
        if (!route.query.q || route.query.q == "") newRoute += "?";
        else newRoute += "&";
        newRoute += "lo=" + this.minPrice;
      }
      if (this.maxPrice) {
        if (
          (!route.query.q || route.query.q == "") &&
          (!this.minPrice || this.minPrice == "")
        ) {
          newRoute += "?";
        } else {
          newRoute += "&";
        }
        newRoute += "hi=" + this.maxPrice;
      }
      window.location.replace(newRoute);
    }
  }
};
</script>

<style lang="sass" scoped>
</style>