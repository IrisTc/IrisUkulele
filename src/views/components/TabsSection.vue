<template>
  <div class="wrapper">
    <div id="nav-tabs">
      <h3>曲谱列表</h3>
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <nav-tabs-card no-label>
            <template slot="content">
              <md-tabs class="md-success" md-alignment="left">

                <md-tab id="tab-piano" md-label="钢琴" md-icon="chat">
                  <score-list :list="pianoList" />
                </md-tab>

                <md-tab id="tab-guitar" md-label="吉他" md-icon="chat">
                  <score-list :list="guitarList" />
                </md-tab>

                <md-tab id="tab-sing" md-label="尤克里里" md-icon="face">
                  <score-list :list="singList" />
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
import ScoreList from "@/components/ScoreList.vue";

export default {
  components: {
    NavTabsCard,
    ScoreList,
  },
  props: ['pianoList', 'guitarList', 'singList'],
  data() {
    return {
      searchList: [],
      searchValue: "",
    };
  },
  created() {
    
  },
  methods: {
    search() {
      let _this = this;
      axios.get("http://iristao.cn/api/ukulele/music?title=" + _this.searchValue).then((res) => {
        _this.searchList = res.data.result;
      })
    }
  }
};
</script>
