<template>
  <el-main>
    <div class="score" id="osmd-score"></div>
  </el-main>
</template>

<script>
import axios from "axios";
import { OpenSheetMusicDisplay, AJAX } from "opensheetmusicdisplay";
export default {
  props: ["score", "backend", "instrument"],
  data() {
    return {
      osmd: null,
      scoreLoading: false,
      zoom: 1.0
    };
  },
  watch: {
    score(val, oldVal) {
      console.log("watch score");
      if (!val || val === oldVal) return;
      this.loadScoreAndRender(val);
    },
    instrument(val, oldVal) {
      console.log("instrument");

      if (!val || val === oldVal) return;
      this.reRenderInstrument(val);
    },
    backend(val, oldVal) {
      console.log(val, oldVal);
      if (!val || val === oldVal) return;
      this.loadScoreAndRender(val);
    }
  },
  mounted() {
    this.osmd = new OpenSheetMusicDisplay(
      document.getElementById("osmd-score")
    );

    // this.$emit("osmdInit", this.osmd);
    // if (this.score) this.loadScore(this.score);
  },
  methods: {
    async reRenderInstrument(val) {
      var that = this;
      var scoreUrl =
        "http://localhost:8089/musicXML/MuzioClementi_SonatinaOpus36No1_Part1.xml";
      this.scoreLoading = true;

      // await this.osmd.load(scoreXml.data);
      // this.scoreLoading = false;
      // await this.$nextTick();

      // 在初始化osmd时，配置的参数无效
      this.osmd.setOptions({
        fingeringPosition: "above",
        fingeringInsideStafflines: "true",
        disableCursor: true,
        drawComposer: false,
        drawFingerings: true,

        fingeringInsideStafflines: "true", // default: false. true draws fingerings directly above/below notes
        setWantedStemDirectionByXml: true, // try false, which was previously the default behavior
        // drawUpToMeasureNumber: 3, // draws only up to measure 3, meaning it draws measure 1 to 3 of the piece.
        // coloring options
        coloringEnabled: true,
        defaultColorNotehead: "#ffffff", // try setting a default color. default is black (undefined)
        defaultColorStem: "#48D1CC",

        autoBeam: true, // try true, OSMD Function Test AutoBeam sample
        autoBeamOptions: {
          beam_rests: true,
          beam_middle_rests_only: false,
          // groups: [[3, 4], [1, 1]],
          maintain_stem_directions: false
        }
      });

      await this.osmd.render();
    },
    async loadScoreAndRender(scoreUrl) {
      var localScoreUrl = `musicXML/${scoreUrl}`;
      console.log(localScoreUrl);

      this.osmd.clear();

      this.scoreLoading = true;
      let scoreXml = await axios.get(localScoreUrl);

      await this.osmd.load(scoreXml.data);
      this.scoreLoading = false;
      await this.$nextTick();

      await this.osmd.render();
      this.$emit("scoreLoaded");
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
