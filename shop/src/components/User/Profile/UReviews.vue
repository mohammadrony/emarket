<template>
  <div>
    <div style="color: #001e5f" v-if="reviews != 0 && reviews != 1">
      <h4>You made {{ reviews }} reviews on product.</h4>
    </div>
    <div style="color: #001e5f" v-if="reviews == 0 || reviews == 1">
      <h4>You made {{ reviews }} review on product.</h4>
    </div>

    <div v-for="review in reviewList2" :key="review.id" class="mb-2">
      <b-card class="mt-3" bg-variant="white" text-variant="dark">
        <b-row>
          <b-col cols="3">
            <b-img
              class="mb-2"
              :src="review.Product.image1"
              height="140px"
              width="140px"
            />
          </b-col>
          <b-col cols="9">
            your review on&nbsp;
            <b-link :to="`/product/${review.ProductId}`">
              {{ review.Product.title }}
            </b-link>
            <b-row class="mt-3">
              <b-col cols="7">
                <b-form-rating
                  readonly
                  :value="review.rating"
                  variant="primary"
                  class="mb-2"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p>{{ review.comment }}</p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <b-pagination
      v-if="reviews > perPage"
      size="lg"
      v-model="currentPage"
      :total-rows="reviews"
      :per-page="perPage"
      @input="paginate(currentPage)"
    ></b-pagination>
  </div>
</template>

<script>
import ReviewService from "@/services/ReviewService.js";
export default {
  name: "UReviews",
  components: {},
  data() {
    return {
      reviews: 0,
      currentPage: 1,
      perPage: 3,
      userId: 0,
      user: {},
      editReviewAlert: null,
      editReviewId: 0,
      editRating: null,
      editComment: "",
      productId: 0,
      reviewList: [],
      reviewList2: [],
    };
  },
  async mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
    this.user = this.$store.state.CurrentUser.user;
    try {
      this.reviewList = (
        await ReviewService.getUsersReviewList(this.userId)
      ).data;
      if (this.reviewList) {
        this.reviews = this.reviewList.length;
        const start = 0;
        this.reviewList2 = this.reviewList.slice(start, start + this.perPage);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  methods: {
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.reviewList2 = this.reviewList.slice(start, start + this.perPage);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
