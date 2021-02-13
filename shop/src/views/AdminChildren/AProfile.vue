<template>
  <div class="a-profile">
    <ATopHeader></ATopHeader>
    <b-container>
      <b-row align-v="center">
        <b-col>
          <h3>Admin Profile Page</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
            illum dolor nobis voluptate officia reprehenderit eveniet nam omnis
            veritatis ut alias quas, praesentium numquam fuga accusamus
            doloribus perferendis itaque quae.
          </p>
        </b-col>
        <b-col>
          <img src="/img/svg/profile.svg" alt="" width="300" />
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "AProfile",
  components: {
    ATopHeader,
    Footer
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
