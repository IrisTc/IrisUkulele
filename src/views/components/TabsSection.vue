<template>
  <div class="wrapper">
    <div id="nav-tabs">
      <h3>曲谱列表</h3>
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <nav-tabs-card no-label>
            <template slot="content">
              <md-tabs class="md-success" md-alignment="left">
                <md-tab id="tab-sing" md-label="弹唱" md-icon="face">
                  <score-list :list="singList" />
                </md-tab>

                <md-tab id="tab-finger" md-label="指弹" md-icon="chat">
                  <score-list :list="fingerList" />
                </md-tab>

                <md-tab id="tab-search" md-label="查询" md-icon="search">
                  <div>
                    <md-field class="md-form-group" slot="inputs">
                      <md-icon>face</md-icon>
                      <label>曲譜名，如 彩虹</label>
                      <md-input v-model="searchValue"></md-input>
                      <md-button @click="search">搜索</md-button>
                    </md-field>
                    <score-list :list="searchList" />
                  </div>
                </md-tab>
              </md-tabs>
            </template>
          </nav-tabs-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavTabsCard } from "@/components";
import ScoreList from "../../components/ScoreList.vue";
const axios = require("axios").default;

export default {
  components: {
    NavTabsCard,
    ScoreList,
  },
  // props: ['list'],
  data() {
    return {
      singList: [],
      fingerList: [],
      searchList: [],
      searchValue: "",
    };
  },
  created() {
    let _this = this;
    axios
      .get("http://ts.tcualhp.cn/api/ukulele/music?type=sing")
      .then((res)=> {
        _this.singList = res.data.result;
      });
    axios
      .get("http://ts.tcualhp.cn/api/ukulele/music?type=finger")
      .then((res) => {
        _this.fingerList = res.data.result;
      });
  },
  methods: {
    search() {
      let _this = this;
      axios.get("http://ts.tcualhp.cn/api/ukulele/music?title=" + _this.searchValue).then((res) => {
        _this.searchList = res.data.result;
      })
    }
  }
};
</script>

<style lang="css">
.list-item {
  height: 60px;
  margin-bottom: 40px;
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
