<template>
  <div>
    <b-row align-v="center">
      <b-col />
      <b-col cols="4" class="text-center">
        <b-card class="py-4">
          <br />
          <strong>
            <span>{{ averageRating }}</span>
            <span>/5</span>
          </strong>
          <b-row class="mt-2">
            <b-col cols="2" />
            <b-col cols="8">
              <b-form-rating
                readonly
                :value="averageRating"
                variant="primary"
              />
            </b-col>
            <b-col cols="2" />
          </b-row>
          <h6 class="mt-2">
            {{ ratingCount }}
            {{ ratingCount >= 1 ? "rating" : "ratings" }} &amp;
            {{ commentCount }} {{ commentCount >= 1 ? "comment" : "comments" }}
          </h6>
          <br />
        </b-card>
      </b-col>
      <b-col cols="4" class="justify-content-center">
        <b-row align-v="center" class="my-2">
          <b-col cols="2">
            <small>5 star</small>
          </b-col>
          <b-col cols="7">
            <b-progress variant="primary">
              <b-progress-bar
                :value="fiveStarPercent"
                :label="`${fiveStar}`"
              ></b-progress-bar>
            </b-progress>
          </b-col>
          <b-col cols="3">
            <small
              >{{ fiveStarPercent }} <b-icon icon="percent"></b-icon
            ></small>
          </b-col>
        </b-row>

        <b-row align-v="center" class="my-2">
          <b-col cols="2">
            <small>4 star</small>
          </b-col>
          <b-col cols="7">
            <b-progress variant="primary">
              <b-progress-bar
                :value="fourStarPercent"
                :label="`${fourStar}`"
              ></b-progress-bar>
            </b-progress>
          </b-col>
          <b-col cols="3">
            <small>
              {{ fourStarPercent }}
              <b-icon icon="percent"></b-icon>
            </small>
          </b-col>
        </b-row>

        <b-row align-v="center" class="my-2">
          <b-col cols="2">
            <small>3 star</small>
          </b-col>
          <b-col cols="7">
            <b-progress variant="primary">
              <b-progress-bar
                :value="threeStarPercent"
                :label="`${threeStar}`"
              ></b-progress-bar>
            </b-progress>
          </b-col>
          <b-col cols="3">
            <small
              >{{ threeStarPercent }} <b-icon icon="percent"></b-icon
            ></small>
          </b-col>
        </b-row>

        <b-row align-v="center" class="my-2">
          <b-col cols="2">
            <small>2 star</small>
          </b-col>
          <b-col cols="7">
            <b-progress variant="primary">
              <b-progress-bar
                :value="twoStarPercent"
                :label="`${twoStar}`"
              ></b-progress-bar>
            </b-progress>
          </b-col>
          <b-col cols="3">
            <small>{{ twoStarPercent }} <b-icon icon="percent"></b-icon></small>
          </b-col>
        </b-row>

        <b-row align-v="center" class="my-2">
          <b-col cols="2">
            <small>1 star</small>
          </b-col>
          <b-col cols="7">
            <b-progress variant="primary">
              <b-progress-bar
                :value="oneStarPercent"
                :label="`${oneStar}`"
              ></b-progress-bar>
            </b-progress>
          </b-col>
          <b-col cols="3">
            <small>{{ oneStarPercent }} <b-icon icon="percent"></b-icon></small>
          </b-col>
        </b-row>
      </b-col>
      <b-col />
    </b-row>

    <hr />
    <b-row>
      <b-col cols="6">
        <h4>Customer Review</h4>
        <hr />
        <div v-for="review in reviewList2" :key="review.id" class="mb-2">
          <b-card
            bg-variant="white"
            text-variant="dark"
            v-if="review.comment != null && review.UserId != userId"
          >
            <b-row>
              <b-col cols="3">
                <b-img
                  :src="review.User.profileImage"
                  height="60px"
                  width="60px"
                />
                <div class="mt-3">
                  <b-link>
                    {{ review.User.firstName + " " + review.User.lastName }}
                  </b-link>
                </div>
              </b-col>
              <b-col cols="9">
                <b-row>
                  <b-col cols="7">
                    <b-form-rating
                      readonly
                      :value="review.rating"
                      variant="primary"
                    />
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <p>{{ review.comment }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <small class="mr-2">
                      <b-link
                        v-if="userId == review.UserId"
                        @click="editReview(review)"
                      >
                        edit
                      </b-link>
                    </small>
                    <small>
                      <b-link
                        v-if="userId == review.UserId || admin"
                        @click="deleteReview(review)"
                      >
                        delete
                      </b-link>
                    </small>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <b-pagination
          v-if="reviews > perPage"
          size="md"
          v-model="currentPage"
          :total-rows="reviews"
          :per-page="perPage"
          @input="paginate(currentPage)"
        ></b-pagination>
      </b-col>
      <b-col cols="6">
        <b-card bg-variant="white" text-variant="dark" v-if="userReviewFlag">
          <b-card-title> Your Review </b-card-title>
          <b-row>
            <b-col cols="4">
              <b-img
                :src="currentUserReview.User.profileImage"
                height="90px"
                width="90px"
              />
              <div class="mt-2">
                <b-link>
                  {{
                    currentUserReview.User.firstName +
                    " " +
                    currentUserReview.User.lastName
                  }}
                </b-link>
              </div>
            </b-col>
            <b-col cols="8">
              <b-row>
                <b-col cols="7">
                  <b-form-rating
                    readonly
                    :value="currentUserReview.rating"
                    variant="primary"
                  />
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <p>{{ currentUserReview.comment }}</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <small class="mr-2">
                    <b-link @click="editReview(currentUserReview)">
                      edit
                    </b-link>
                  </small>
                  <small>
                    <b-link @click="deleteReview(currentUserReview)">
                      delete
                    </b-link>
                  </small>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
        <b-card v-if="!userReviewFlag">
          <div class="mt-2 ml-3">
            <a variant="primary">
              <b-icon-pen />&nbsp;<strong>Write a review</strong>
            </a>
          </div>
          <hr />
          <b-form v-if="userLoggedIn" @submit.stop.prevent="createReview">
            <b-row>
              <b-col cols="5">
                <h6>Rating</h6>
                <b-form-rating v-model="rating" variant="primary" />
              </b-col>
            </b-row>
            <div class="mt-4">Comment</div>
            <b-form-group>
              <b-form-textarea
                required
                v-model="comment"
                placeholder="Write a review"
                rows="3"
                max-rows="8"
              />
            </b-form-group>
            <b-button variant="primary" type="submit"> Submit </b-button>
          </b-form>
          <div v-if="!userLoggedIn">
            You'll not be able to write a review until you're logged in.
            <b-row>
              <b-col>
                <b-button to="/login" class="mt-3" variant="outline-dark">
                  Login
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      v-if="userLoggedIn"
      hide-footer
      id="editReviewModal"
      title="Write a review"
    >
      <b-form @submit.stop.prevent="updateReview">
        <b-row>
          <b-col cols="5">
            <h6>Rating</h6>
            <b-form-rating v-model="editRating" variant="primary" />
          </b-col>
        </b-row>
        <div class="mt-4">Comment</div>
        <b-form-group>
          <b-form-textarea
            v-model="editComment"
            placeholder="Write a review"
            rows="3"
            required
            max-rows="10"
          />
        </b-form-group>
        <b-button type="submit" variant="primary"> Submit </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import ReviewService from "@/services/ReviewService.js";
import ProductsService from "@/services/ProductsService.js";
export default {
  name: "Review",
  components: {},
  data() {
    return {
      zeroStar: 0,
      zeroStarPercent: 0,
      oneStar: 0,
      oneStarPercent: 0,
      twoStar: 0,
      twoStarPercent: 0,
      threeStar: 0,
      threeStarPercent: 0,
      fourStar: 0,
      fourStarPercent: 0,
      fiveStar: 0,
      fiveStarPercent: 0,
      ratingCount: 0,
      averageRating: 0,
      commentCount: 0,
      currentUserReview: {},
      userReviewFlag: false,
      userId: 0,
      admin: false,
      userLoggedIn: false,
      rating: 0,
      comment: "",
      reviewEditing: {},
      editRating: 0,
      editComment: "",
      productId: 0,
      currentPage: 1,
      perPage: 3,
      reviews: 0,
      productRating: {},
      reviewList: [],
      reviewList2: [],
    };
  },
  async mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
    this.admin = this.$store.state.CurrentUser.admin;
    this.userLoggedIn = this.$store.state.CurrentUser.userLoggedIn;
    this.productId = parseInt(this.$route.params.productId);
    try {
      this.productRating = (
        await ProductsService.getProductRating(this.productId)
      ).data;
    } catch (error) {
      console.log(error.response.data.error);
    }
    try {
      this.reviewList = (
        await ReviewService.getReviewList(this.productId)
      ).data;
      if (this.reviewList) {
        this.reviews = this.reviewList.length;
        const start = 0;
        this.reviewList2 = this.reviewList.slice(start, start + this.perPage);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
    var i;
    for (i = 0; i < this.reviewList.length; i++) {
      if (this.reviewList[i].comment != "") this.commentCount++;
      if (this.reviewList[i].rating == 0) this.zeroStar++;
      else if (this.reviewList[i].rating == 1) this.oneStar++;
      else if (this.reviewList[i].rating == 2) this.twoStar++;
      else if (this.reviewList[i].rating == 3) this.threeStar++;
      else if (this.reviewList[i].rating == 4) this.fourStar++;
      else if (this.reviewList[i].rating == 5) this.fiveStar++;

      if (this.reviewList[i].UserId == this.userId)
        this.currentUserReview = this.reviewList[i];
      this.userReviewFlag = Object.keys(this.currentUserReview).length != 0;
      if (!this.reviewList[i].mode) {
        this.reviewList[i].mode = 0;
      }
    }
    this.ratingCount =
      this.oneStar +
      this.twoStar +
      this.threeStar +
      this.fourStar +
      this.fiveStar;
    if (this.ratingCount != 0) {
      this.averageRating =
        Math.round(
          (10 *
            (5 * this.fiveStar +
              4 * this.fourStar +
              3 * this.threeStar +
              2 * this.twoStar +
              1 * this.oneStar)) /
            this.ratingCount
        ) / 10;
      this.oneStarPercent = Math.round((this.oneStar * 100) / this.ratingCount);
      this.twoStarPercent = Math.round((this.twoStar * 100) / this.ratingCount);
      this.threeStarPercent = Math.round(
        (this.threeStar * 100) / this.ratingCount
      );
      this.fourStarPercent = Math.round(
        (this.fourStar * 100) / this.ratingCount
      );
      this.fiveStarPercent = Math.round(
        (this.fiveStar * 100) / this.ratingCount
      );
    }
  },
  methods: {
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.reviewList2 = this.reviewList.slice(start, start + this.perPage);
    },
    async createReview() {
      await this.$store.dispatch("Review/createReview", {
        rating: this.rating,
        comment: this.comment,
        productId: this.productId,
        productRating: this.productRating,
      });
      await this.$store.dispatch("Products/setAllBackupProducts");
      window.location.reload();
    },

    editReview(review) {
      this.editRating = review.rating;
      this.editComment = review.comment;
      this.reviewEditing = review;
      this.$bvModal.show("editReviewModal");
    },
    async updateReview() {
      this.$bvModal.hide("editReviewModal");
      await this.$store.dispatch("Review/updateReview", {
        review: this.reviewEditing,
        newRating: this.editRating,
        newComment: this.editComment,
      });
      await this.$store.dispatch("Products/setAllBackupProducts");
      window.location.reload();
    },

    async deleteReview(review) {
      if (this.userLoggedIn) {
        await this.$store.dispatch("Review/deleteReview", review);
        await this.$store.dispatch("Products/setAllBackupProducts");
        window.location.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
