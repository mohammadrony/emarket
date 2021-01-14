<template>
  <div class="wishlist">
    <TopHeader></TopHeader>
    <b-container>
      <b-row>
        <b-col v-for="wishItem in myWishlist" :key="wishItem.id" cols="6">
          <b-card img-left style="max-height: 25rem">
            <b-card-img :src="wishItem.image1" max-height></b-card-img>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer></Footer>
  </div>
</template>

<script>
import WishlistService from "@/services/WishlistService.js"
import TopHeader from "@/components/TopHeader.vue"
import Footer from "@/components/Footer.vue"
export default {
  name: "Wishlist",
  components: {
    TopHeader,
    Footer
  },
  data(){
    return {
      myWishlist: null,
    }
  },
  async mounted() {
    this.myWishlist= (await WishlistService.getWishlist()).data;
    console.log(this.myWishlist)
  }
};
</script>

<style scoped lang="scss">

</style>
