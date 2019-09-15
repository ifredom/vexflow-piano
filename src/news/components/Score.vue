<template>
  <el-main>
    <div class="score" id="osmd-score"></div>
  </el-main>
</template>

<script>
import axios from "axios";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
export default {
  props: ["score", "backend"],
  data() {
    return {
      osmd: null,
      scoreLoading: false,
      zoom: 1.0
    };
  },
  watch: {
    score(val, oldVal) {
      console.log("score");

      if (!val || val === oldVal) return;
      this.loadScore(val);
    },
    backend(val, oldVal) {
      console.log(val, oldVal);
      if (!val || val === oldVal) return;
      this.reRender(val);
    }
  },
  mounted() {
    this.osmd = new OpenSheetMusicDisplay(
      document.getElementById("osmd-score"),
      {}
    );
    // this.$emit("osmdInit", this.osmd);
    // if (this.score) this.loadScore(this.score);
  },
  methods: {
    reRender(backend) {
      this.osmd = new OpenSheetMusicDisplay(
        document.getElementById("osmd-score"),
        {
          backend: backend
        }
      );
    },
    async loadScore(scoreUrl) {
      this.scoreLoading = true;
      let scoreXml = await axios.get(scoreUrl);
      await this.osmd.load(scoreXml.data);
      this.scoreLoading = false;
      await this.$nextTick();

      this.osmd.setOptions({
        defaultColorRest: "#AAAAAA",
        drawSubtitle: false
      });
      await this.osmd.render();
      this.$emit("scoreLoaded");
    },
    handleZoomIn() {
      var that = this;
      this.zoom = this.zoom / 1.2;
      window.setTimeout(function() {
        that.osmd.zoom = that.zoom;
        that.osmd.render();
        that.$emit("zoom", that.zoom);
      }, 0);
    },
    handleZoomOut() {
      var that = this;
      this.zoom = this.zoom * 1.2;
      window.setTimeout(function() {
        that.osmd.zoom = that.zoom;
        that.osmd.render();
        that.$emit("zoom", that.zoom);
      }, 0);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
