<template>
  <div>
    <b-row align-v="center">
      <div class="ml-3 mb-1">Price Range</div>
      <b-col cols="2">
        <b-form-input
          @keyup.enter="priceFilter"
          v-model="minPrice"
          placeholder="Min"
        />
      </b-col>
      To
      <b-col cols="2">
        <b-form-input
          @keyup.enter="priceFilter"
          v-model="maxPrice"
          placeholder="Max"
        />
      </b-col>
      <b-col cols="2">
        <b-button block @click="priceFilter" variant="outline-info">
          <b-icon-filter></b-icon-filter>
          Filter
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  components: {},
  data() {
    return {
      minPrice: null,
      maxPrice: null,
    };
  },
  mounted() {
    this.minPrice = this.$route.query.lo;
    this.maxPrice = this.$route.query.hi;
  },
  computed: {},
  methods: {
    priceFilter() {
      const route = this.$route;
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
      this.$router.push({ path: newRoute });
    },
  },
};
</script>

<style lang="scss" scoped></style>
