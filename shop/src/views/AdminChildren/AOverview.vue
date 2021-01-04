<template>
  <div class="a-overview">
    <ATopHeader></ATopHeader>
    <b-container>
      <b-row align-v="center">
        <b-col md="6">
          <h3>Overview Page</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
            illum dolor nobis voluptate officia reprehenderit eveniet nam omnis
            veritatis ut alias quas, praesentium numquam fuga accusamus
            doloribus perferendis itaque quae.
          </p>
        </b-col>
        <b-col md="6">
          <img src="/img/svg/overview.svg" alt="" width="300" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
export default {
  name: "AOverview",
  components: {
    ATopHeader
  }
};
</script>

<style lang="scss" scoped></style>
