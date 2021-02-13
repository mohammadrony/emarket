<template>
  <div class="a-overview">
    <ATopHeader></ATopHeader>
    <b-container class="mt-5">
      <b-row align-v="center">
        <b-col>
          <h3>Admin Dashboard Page</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
            illum dolor nobis voluptate officia reprehenderit eveniet nam omnis
            veritatis ut alias quas, praesentium numquam fuga accusamus
            doloribus perferendis itaque quae.
          </p>
        </b-col>
        <b-col>
          <img src="/img/svg/overview.svg" alt="" width="300" />
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-5"/>
  </div>
</template>

<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "AOverview",
  components: {
    ATopHeader,
    Footer
  }
};
</script>

<style lang="scss" scoped></style>
