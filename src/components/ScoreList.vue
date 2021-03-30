<template>
  <div>
    <md-content class="md-scrollbar scroll-content">
      <div class="list-item" v-for="item in list" :key="item.index">
        <div class="list-content" @click="tap(item)">
          <span class="content-title">《 {{ item.title }} 》</span>
          <span v-if="showTime" class="content-time tim-note">{{
            item.createdAt
          }}</span>
          <span v-if="showDelete" class="content-time tim-note"
            ><i class="material-icons">delete</i></span
          >
          <span
            v-if="item.type == 'sing'"
            class="content-type badge margin badge-primary"
            >尤克里里</span
          >
          <span
            v-if="item.type == 'guitar'"
            class="content-type badge margin badge-rose"
            >吉他</span
          >

          <span
            v-if="item.type == 'piano'"
            class="content-type badge margin badge-warning"
            >钢琴</span
          >
        </div>
      </div>

      <div style="display: none" class="viewer-box">
        <viewer :images="images" @inited="inited" ref="viewer">
          <img v-for="src in images" :src="src" :key="src" />
        </viewer>
      </div>

    </md-content>
  </div>
</template>
                  
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  props: {
    list: {
      type: Array,
    },
    showTime: {
      type: Boolean,
      default: true,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "view",
    },
  },
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
      this.images = item.scoreImg.sort();
      this.$viewer.show();
    },
    tap(item) {
      if (this.type === "view") {
        this.view(item);
      } else if (this.type === "delete") {
        this.$emit("delete", { id: item._id });
      }
    },
  },
};
</script>
                  
<style lang="css">
.scroll-content {
  max-height: 800px;
  overflow: auto;
}
.viewer-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 100px;
  z-index: 9999999;
}
.list-item {
  height: 60px;
  margin-bottom: 20px;
  width: 100%;
  position: relative;
  display: flex;
}
.list-item:hover {
  box-shadow: 0 14px 26px -12px rgba(0, 0, 0, 0.42),
    0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}
.list-content {
  width: 100%;
  align-self: center;
  position: relative;
}
.content-title {
  font-size: 18px;
}
.content-type {
  float: right;
}
.content-time {
  float: right;
  margin-left: 20px;
}
</style>