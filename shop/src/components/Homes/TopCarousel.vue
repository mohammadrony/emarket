<template>
  <div>
    <b-container class="mt-3">
      <b-row>
        <b-col>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide
              caption="A New Online Shop Experience."
              text="Hello"
            >
              <template #img>
                <img
                  class="img-fluid w-100"
                  src="http://localhost:8084/public/display-images/home_slider_1.jpg"
                />
              </template>
            </b-carousel-slide>
            <b-carousel-slide>
              <template #img>
                <img
                  class="img-fluid w-100"
                  src="http://localhost:8084/public/display-images/home_slider_0.jpg"
                />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "TopCarousel",
  components: {},
  data() {
    return {
      slide: 0,
      sliding: null,
      topCarousel: {
        perPage: 1,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        centerMode: true,
        speed: 1000,
        loop: true,
      },
    };
  },
  mounted() {},
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
  computed: {},
};
</script>

<style lang="sass" scoped>
</style>