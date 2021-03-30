<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Smile.</h1>
            <h4>
              Your spark isn't your purpose.That last box fills in when you are
              ready to come live.And,the thing is,you are pretty great at
              Jazzing.
            </h4>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>brightness_high</md-icon>
                  </div>
                  <h4 class="info-title">Piano</h4>
                  <score-list
                    :list="pianoList"
                    :showTime="false"
                    :showDelete="true"
                    type="delete"
                    v-on:delete="deleteItem"
                  />
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <md-icon>brightness_medium</md-icon>
                  </div>
                  <h4 class="info-title">Guitar</h4>
                  <score-list
                    :list="guitarList"
                    :showTime="false"
                    :showDelete="true"
                    type="delete"
                    v-on:delete="deleteItem"
                  />
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-danger">
                    <md-icon>brightness_low</md-icon>
                  </div>
                  <h4 class="info-title">Ukulele</h4>
                  <score-list
                    :list="singList"
                    :showTime="false"
                    :showDelete="true"
                    type="delete"
                    v-on:delete="deleteItem"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <md-dialog-confirm
      :md-active.sync="showDelete"
      md-title="确认删除"
      md-content="如果需要修改麻烦先确认删掉再重新上传哦~"
      md-confirm-text="删除"
      md-cancel-text="取消"
      @md-confirm="onConfirm"
    />
  </div>
</template>

<script>
import api from '@/utils/api'
import ScoreList from "@/components/ScoreList.vue";

export default {
  components: {
    ScoreList,
  },
  data() {
    return {
      pianoList: [],
      guitarList: [],
      singList: [],
      showDelete: false,
      deleteId: 0,
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/soul.jpg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.pianoList = await api.get("/music?type=piano");
      this.guitarList = await api.get("/music?type=guitar");
      this.singList = await api.get("/music?type=sing");
    },
    deleteItem(data) {
      this.deleteId = data.id;
      this.showDelete = true;
    },
    async onConfirm() {
      await api.post("/music/delete", {
        id: this.deleteId,
      });
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
