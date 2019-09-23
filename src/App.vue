<template>
  <div id="app" class="root-view">
    <div class="score-container">
      <el-select v-model="selectedScore" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <Score :score="selectedScore"></Score>
    </div>
    <div class="control-container">
      <PlaybackControls v-if="pbEngine" :playbackEngine="pbEngine" :scoreTitle="scoreTitle"></PlaybackControls>
    </div>
  </div>
</template>


<script>
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import PlaybackControls from "./components/PlaybackControls.vue";
import Score from "@/components/Score";
export default {
  name: "app",
  components: { Score, PlaybackControls },
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
      },
      options: [
        {
          value: "MuzioClementi_SonatinaOpus36No1_Part1.xml",
          label: "MuzioClementi_SonatinaOpus36No1_Part1.xml"
        },
        {
          value: "JohannSebastianBach_Air.xml",
          label: "JohannSebastianBach_Air.xml"
        },
        {
          value: "Mozart_DasVeilchen.xml",
          label: "Mozart_DasVeilchen.xml"
        }
      ]
    };
  },
  created() {
    this._createNewOsmd = true; // 是否已经渲染出score
  },
  methods: {}
};
</script>

<style style="stylus">
body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
}
.root-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* flex-direction: ; */
}

.score-container {
  flex: 1;
  height: calc(100%-200px);
  overflow-y: scroll;
}

.control-container {
  height: 200px;
  background: pink;
}
</style>
