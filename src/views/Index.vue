<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <div class="brand title">
              <h1>Iris's Ukulele</h1>
              <h3>A Website for collect ukulele scores.</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-tabs">
        <div class="container">
          <tabs></tabs>
        </div>
      </div>
      <div class="section section-intro">
        <h2 class="title text-center">Let's talk Ukulele</h2>
        <h5 class="description">In the late 1870s, Portuguese sailors brought a ukulele-type instrument called the braguinha to the Hawailan Islands. The native Hawailans were impressed when they saw the speedy and intricate finger-work of the man playing the stringed instrument. They dubbed it a "ukulele" which means "jumping flea" in English. Sometimes, it is alse called a "uku" lele.</h5>
      </div>
      <div class="section section-picture">
        <div class="container">
          <picture-carousel></picture-carousel>
        </div>
      </div>
      <div class="section section-upload"  id="uploadSection">
        <div class="container">
          <upload></upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from "./components/TabsSection";
import PictureCarousel from "./components/PictureCarousel";
import Upload from "./components/Upload";

export default {
  components: {
    Tabs,
    PictureCarousel,
    Upload
  },
  name: "index",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/header.jpg")
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg")
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg")
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg")
    }
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      leafShow: false
    };
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      };
    }
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  }
};
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}

.description {
  width: 60%;
  margin: auto;
}
</style>
