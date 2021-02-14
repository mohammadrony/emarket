<template>
  <div>
    <b-container id="review_section">
      <b-row align-v="center">
        <b-col></b-col>
        <b-col cols="4" class="text-center">
          <b-card class="py-4">
            <br />
            <span class="product-rating">{{ averageRating }}</span
            ><span>/5</span>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="8">
                <b-form-rating
                  readonly
                  :value="averageRating"
                  variant="primary"
                  class="mb-2"
                ></b-form-rating>
              </b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <h6 class="mt-2">
              {{ ratingCount }} ratings & {{ commentCount }} reviews
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
              <small
                >{{ fourStarPercent }} <b-icon icon="percent"></b-icon
              ></small>
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
              <small
                >{{ twoStarPercent }} <b-icon icon="percent"></b-icon
              ></small>
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
              <small
                >{{ oneStarPercent }} <b-icon icon="percent"></b-icon
              ></small>
            </b-col>
          </b-row>
        </b-col>
        <b-col></b-col>
      </b-row>

      <hr />
      <b-row>
        <b-col cols="6">
          <h4>Customer Review</h4>
          <hr />
          <div v-for="review in reviewList" :key="review.id" class="mb-2">
            <b-card
              bg-variant="white"
              text-variant="dark"
              v-if="review.comment != null && review.UserId != userId"
            >
              <b-row>
                <b-col cols="3">
                  <b-img
                    class="mb-2"
                    :src="review.User.profileImage"
                    height="60px"
                    width="60px"
                  ></b-img>
                  <br />
                  <b-link>{{
                    review.User.firstName + " " + review.User.lastName
                  }}</b-link>
                  <br />
                </b-col>
                <b-col cols="9">
                  <b-row>
                    <b-col cols="7">
                      <b-form-rating
                        readonly
                        :value="review.rating"
                        variant="primary"
                        class="mb-2"
                      ></b-form-rating>
                    </b-col>
                  </b-row>
                  <b-row>
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
                          >edit</b-link
                        >
                      </small>
                      <small>
                        <b-link
                          v-if="userId == review.UserId || admin"
                          @click="deleteReview(review)"
                          >delete</b-link
                        >
                      </small>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
        <b-col cols="6">
          <b-card
            bg-variant="white"
            text-variant="dark"
            v-if="currentUserReview"
          >
            <b-card-title> Your Review </b-card-title>
            <b-row>
              <b-col cols="4">
                <b-img
                  class="mb-2"
                  :src="currentUserReview.User.profileImage"
                  height="90px"
                  width="90px"
                ></b-img>
                <br />
                <b-link>{{
                  currentUserReview.User.firstName +
                    " " +
                    currentUserReview.User.lastName
                }}</b-link>
                <br />
              </b-col>
              <b-col cols="8">
                <b-row>
                  <b-col cols="7">
                    <b-form-rating
                      readonly
                      :value="currentUserReview.rating"
                      variant="primary"
                      class="mb-2"
                    ></b-form-rating>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p>{{ currentUserReview.comment }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <small class="mr-2">
                      <b-link @click="editReview(currentUserReview)"
                        >edit</b-link
                      >
                    </small>
                    <small>
                      <b-link @click="deleteReview(currentUserReview)"
                        >delete</b-link
                      >
                    </small>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
          <b-card v-if="!currentUserReview">
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
                  <b-form-rating
                    v-model="rating"
                    variant="primary"
                    class="mb-4"
                  ></b-form-rating>
                </b-col>
              </b-row>
              <h6>Review</h6>
              <b-form-group>
                <b-form-textarea
                  @keyup="loginAlert = true"
                  class="mb-3"
                  required
                  v-model="comment"
                  placeholder="Write a review"
                  rows="3"
                  max-rows="8"
                ></b-form-textarea>
              </b-form-group>
              <b-button variant="primary" type="submit" v-if="userLoggedIn"
                >Submit</b-button
              >
            </b-form>
            <div v-if="!userLoggedIn">
              You'll not be able to write a review until you're logged in.
              <b-row>
                <b-col>
                  <b-button to="/login" class="mt-3" variant="warning"
                    >Login</b-button
                  >
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal hide-footer id="editReviewModal" title="Write a review">
      <b-row>
        <b-col cols="5">
          <h6>Rating</h6>
          <b-form-rating
            v-model="editRating"
            variant="primary"
            class="mb-4"
          ></b-form-rating>
        </b-col>
      </b-row>
      <h6>Review</h6>
      <b-form-group>
        <b-form-textarea
          class="mb-4"
          v-model="editComment"
          placeholder="Write a review"
          rows="3"
          max-rows="10"
        ></b-form-textarea>
      </b-form-group>
      <b-alert variant="warning" v-if="editReviewAlert">{{
        editReviewAlert
      }}</b-alert>
      <b-button variant="primary" @click="updateReview" v-if="userLoggedIn"
        >Submit</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import ReviewService from "@/services/ReviewService.js";
// import ReviewReplyService from "@/services/ReviewReplyService.js";
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
      currentUserReview: null,
      userId: 0,
      admin: false,
      userLoggedIn: false,
      reviewAlert: null,
      editReviewAlert: null,
      rating: null,
      comment: "",
      editReviewId: 0,
      editRating: null,
      editComment: "",
      productId: 0,
      loginAlert: false,
      reviewList: []
    };
  },
  async mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
    this.admin = this.$store.state.CurrentUser.admin;
    this.userLoggedIn = this.$store.state.CurrentUser.userLoggedIn;
    this.productId = parseInt(this.$store.state.route.params.productId);
    try {
      this.reviewList = (
        await ReviewService.getReviewList(this.productId)
      ).data;
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
      this.oneStarPercent = Math.round(
        (this.oneStar * 100) / this.ratingCount,
        1
      );
      this.twoStarPercent = Math.round(
        (this.twoStar * 100) / this.ratingCount,
        1
      );
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
    async createReview() {
      if (this.rating == null) this.rating = 0;
      if (this.comment == null) this.comment = "";
      if (this.rating != 0 || this.comment != "") {
        try {
          await ReviewService.createReview({
            rating: this.rating,
            comment: this.comment,
            productId: this.productId
          });
          window.location.reload();
        } catch (error) {
          console.log(error.response.data.error);
        }
      } else {
        this.reviewAlert = "Please add a rating or review to submit.";
      }
    },
    editReview(review) {
      this.editRating = review.rating;
      this.editComment = review.comment;
      this.editReviewId = review.id;
      this.$bvModal.show("editReviewModal");
    },
    async updateReview() {
      if (this.editRating == null) this.editRating = 0;
      if (this.editComment == null) this.editComment = "";
      this.$bvModal.hide("editReviewModal");
      if (this.editRating != 0 || this.editComment != "") {
        try {
          await ReviewService.updateReview({
            id: this.editReviewId,
            rating: this.editRating,
            comment: this.editComment,
            productId: this.productId
          });
          window.location.reload();
        } catch (error) {
          console.log(error.response.data.error);
        }
      } else {
        this.editReviewAlert = "Please add a rating or review to submit.";
      }
    },
    async deleteReview(review) {
      if (this.userLoggedIn) {
        try {
          await ReviewService.deleteReview(review.id);
          window.location.reload();
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
