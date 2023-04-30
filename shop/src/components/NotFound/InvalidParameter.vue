<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="6">
          <b-card class="mt-5" style="color: #001e5f">
            <h2>
              <strong> Page not found. </strong>
            </h2>
            <div class="mt-4">
              We don't have any information about this {{ paramName }}.
              <br />
              This {{ paramName }} might removed from the website.
              <br />
              Or you might clicked on an invalid link.
              <br />
              Go to
              <b-link :to="routerLink">
                {{ pageToNavigate }}
                <b-icon icon="arrow-right" />
              </b-link>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "InvalidParameter",
  props: {
    paramName: {
      required: true,
      type: String,
    },
    pageToNavigate: {
      required: true,
      type: String,
    },
    routerLink: {
      required: true,
      type: String,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
