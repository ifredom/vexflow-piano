<template>
  <div id="app" class="root-view">
    <div class="stage-container"></div>
    <div class="score-container">
      <PlaybackControls :playbackEngine="pbEngine" :scoreTitle="scoreTitle"></PlaybackControls>
      <Score></Score>
    </div>
    <el-container>
      <el-main>hah</el-main>
      <el-footer>
        <Score></Score>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import Score from "@/components/Score";
export default {
  name: "app",
  components: { Score },
  data() {
    return {
      pbEngine: null,
      scoreTitle: "",
      selectedScore: null,
      currentDenominator: 0,
      vexOptions: {
        backend: "canvas",
        zoom: 1.0,
        instrument: ""
      }
    };
  },
  created() {
    this._createNewOsmd = true; // 是否已经渲染出score
  },
  methods: {}
};
</script>

<style style="stylus">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.root-view {
  display: flex;
  /* flex-direction: ; */
}
</style>
