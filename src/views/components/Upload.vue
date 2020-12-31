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
        <md-radio v-model="typeRadio" :value="true">弹唱</md-radio>
        <md-radio v-model="typeRadio" :value="false">指弹</md-radio>
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
      <div v-for="item in chosenSrc" :key="item.index">
        <img
          :src="item"
          alt="Rounded Image"
          class="rounded img-raised add input-img"
        />
      </div>
    </div>
    <div class="submit">
      <md-button class="md-primary" @click="submit">確定添加</md-button>
    </div>
  </div>
</template>
<script>
import { uploadImg } from "../../utils/uploadImg";
const axios = require("axios").default;

export default {
  data() {
    return {
      image: require("@/assets/img/add.png"),
      title: "",
      typeRadio: true,
      uploadFile: [],
      chosenSrc: [],
    };
  },
  computed: {
    type() {
      return this.typeRadio ? "sing" : "finger";
    },
  },
  methods: {
    addImg() {
      this.$refs.fileImg.dispatchEvent(new MouseEvent("click"));
    },
    chooseImg() {
      const inputFile = this.$refs.fileImg.files[0];
      this.uploadFile.push(inputFile);
      if (inputFile) {
        if (
          inputFile.type !== "image/jpeg" &&
          inputFile.type !== "image/png" &&
          inputFile.type !== "image/gif"
        ) {
          alert("不是有效的图片文件！");
          return;
        }
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
    async submit() {
      let scoreSrc = [];
      let _this = this;
      let upload = this.uploadFile;
      for (var i = 0; i < upload.length; i++) {
        uploadImg(upload[i], _this.type, function (src) {
          scoreSrc.push(src);
          if (i == upload.length) {
            axios
              .post("http://ts.tcualhp.cn/api/ukulele/music/add", {
                scoreImg: scoreSrc,
                type: _this.type,
                title: _this.title,
              })
              .then((res) => {
                alert("上传曲谱成功");
                this.$router.go(0);
              });
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.add {
  width: 200px;
  height: 280px;
  float: left;
}
.upload-box {
  height: 280px;
}
.input-img {
  margin-left: 10px;
}
.submit {
  text-align: center;
  margin: 20px;
}
</style>