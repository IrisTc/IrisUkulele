<template>
  <div>
    <div class="title">
      <h2>添加曲譜</h2>
    </div>
    <md-field class="md-form-group" slot="inputs">
      <md-icon>face</md-icon>
      <label>曲譜名，如 彩虹</label>
      <md-input v-model="title"></md-input>
      <div class="flex-column type-radio">
        <md-radio v-model="type" value="piano">钢琴</md-radio>
        <md-radio v-model="type" value="guitar">吉他</md-radio>
        <md-radio v-model="type" value="sing">尤克里里</md-radio>
      </div>
    </md-field>
    <br />
    <div class="upload-box">
      <img
        @click="addImg"
        :src="image"
        alt="Rounded Image"
        class="rounded img-raised add"
      />
      <input
        ref="fileImg"
        @change="chooseImg"
        type="file"
        style="display: none"
      />
      <div v-for="(item, index) in chosenSrc" :key="index">
        <div class="image">
          <i @click="offImg(index)" @mouseenter="arrowTransform" @mouseleave="arrowTransformReturn" :class="{ 'arrowTransform': !arrow, 'arrowTransformReturn': arrow}" class="material-icons off">highlight_off</i>
          <img
            :src="item"
            alt="Rounded Image"
            class="rounded img-raised add input-img"
          />
        </div>
      </div>
    </div>
    <div class="submit">
      <md-button class="md-primary" @click="submit">確定添加</md-button>
    </div>

    <md-dialog-alert
      :md-active.sync="uploading"
      md-content="正在上传，请稍等..."
      md-confirm-text="不准点"
    />

    <md-dialog-alert
      :md-active.sync="uploaded"
      md-content="上传完成"
      md-confirm-text="Cool!"
    />

    <md-dialog-alert
      :md-active.sync="disUpload"
      md-content="没有图片和标题上传啥呢"
      md-confirm-text="ok"
    />
  </div>
</template>
<script>
import { uploadImg } from "../../utils/uploadImg";
import api from "@/utils/api";

const debounce = (function () {
  let timer, result, callNow;
  let context = this;
  let args = arguments;
  if (timer) clearTimeout(timer);
  return function (callback, wait) {
    callNow = !timer;
    timer = setTimeout(function () {
      timer = null;
    }, wait);
    if (callNow) result = callback.apply(context, args);
    return result;
  };
})();

export default {
  data() {
    return {
      image: require("@/assets/img/add.png"),
      title: "",
      type: "piano",
      uploadFile: [],
      chosenSrc: [],
      uploading: false,
      uploaded: false,
      disUpload: false,
      arrow: false
    };
  },
  methods: {
    addImg() {
      this.$refs.fileImg.dispatchEvent(new MouseEvent("click"));
    },
    chooseImg() {
      let inputFile = this.$refs.fileImg.files[0];
      if (inputFile) {
        if (
          inputFile.type !== "image/jpeg" &&
          inputFile.type !== "image/png" &&
          inputFile.type !== "image/gif"
        ) {
          alert("不是有效的图片文件！");
          return;
        }
        this.uploadFile.push(inputFile);
        let _this = this;
        const reader = new FileReader();
        reader.readAsDataURL(inputFile);
        reader.onload = function (e) {
          _this.chosenSrc.push(this.result);
        };
      } else {
        return;
      }
    },
    offImg(index) {
      this.uploadFile.splice(index,1)
      this.chosenSrc.splice(index,1)
    },
    submit() {
      debounce(() => {
        this.upload();
      }, 5000);
    },
    async upload() {
      let upload = this.uploadFile;
      if (upload.length === 0 || this.title === "") {
        this.disUpload = true;
        return;
      }

      let scoreSrc = [];
      this.uploading = true;
      for (var i = 0; i < upload.length; i++) {
        let src = await uploadImg(upload[i], this.type);
        scoreSrc.push(src);
      }
      await api.post("/music/add", {
        scoreImg: scoreSrc,
        type: this.type,
        title: this.title,
      });
      this.uploading = false;
      this.uploaded = true;
      this.chosenSrc = [];
      this.uploadFile = [];
      this.title = "";
      this.$emit("refresh");
    },
    arrowTransform() {
      this.arrow = !this.arrow
    },
    arrowTransformReturn() {
      this.arrow = !this.arrow
    }
  },
};
</script>
<style lang="scss" scoped>
.add {
  width: 200px;
  height: 280px;
  float: left;
}
.upload-box {
  height: 280px;
}
.input-img {
  margin-left: 20px;
}
.submit {
  text-align: center;
  margin: 20px;
}
.image {
  position: relative;
  display: inline;
  .off {
    color: rgba(0, 0, 0, 0.54);
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
  }
}
.arrowTransform{
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(180deg);
  }
  .arrowTransformReturn{
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(0deg);
  }
</style>
