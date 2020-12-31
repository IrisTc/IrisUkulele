<template>
  <div>
    <div class="list-item" v-for="item in list" :key="item.index">
      <div class="list-content" @click="view(item)">
        <span class="content-title">《 {{ item.title }} 》</span>
        <span class="content-time tim-note">{{ item.createdAt }}</span>
        <span
          v-if="item.type == 'sing'"
          class="content-type badge margin badge-rose"
          >弹唱</span
        >
        <span
          v-if="item.type == 'finger'"
          class="content-type badge margin badge-rose"
          >指弹</span
        >
      </div>
    </div>
    <div style="display:none" class="viewer-box">
      <viewer :images="images" @inited="inited" ref="viewer">
        <img v-for="src in images" :src="src" :key="src" />
      </viewer>
    </div>
  </div>
</template>
                  
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  props: ["list"],
  data() {
    return {
      images: [],
    };
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    view(item) {
      this.images = item.scoreImg;
      this.$viewer.show();
    },
  },
};
</script>
                  
<style lang="css">
.viewer-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 100px;
  z-index: 9999999;
}
.list-item {
  height: 100px;
  margin-bottom: 40px;
  width: 100%;
}
.list-item:hover {
  box-shadow: 0 14px 26px -12px rgba(0, 0, 0, 0.42),
    0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.list-content {
  width: 100%;
}
.content-title {
  font-size: 18px;
  font-weight: 400;
  color: #999999;
}
.content-type {
  float: right;
}
.content-time {
  float: right;
  margin-left: 20px;
}
</style>