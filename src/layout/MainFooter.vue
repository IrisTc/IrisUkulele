<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <div class="copyright" style="margin:auto">
        &copy; {{ year }}, made with <md-icon>favorite</md-icon> by
        <a href="http://github.com/irisTc" target="_blank">Iris Tao</a> <a href="https://beian.miit.gov.cn">皖ICP备2021004104号-1</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
