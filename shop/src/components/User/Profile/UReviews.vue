<template>
  <div>
    {{userId}}
    <p>I'm the second tab</p>
  </div>
</template>

<script>
export default {
  name: "UReviews",
  components: {
    
  },
  data() {
    return {
      userId: 0,
    };
  },
  mounted() {
    this.userId = this.$store.state.CurrentUser.userId
  },
  methods: {
    
  },
  computed: {
    
  },
};
</script>

<style lang="sass" scoped>
</style>