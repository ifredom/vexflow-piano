<template>
  <div id="app">
    <el-container>
      <el-container direction="horizontal">
        <div class="navSide" style="width:200px;padding:10px 15px;">
          <img class="person" src="./assets/person.jpg" alt />
          <PlaybackSidebar :playbackEngine="pbEngine" />

          <h2 class="score-control-title">渲染方式</h2>
          <el-radio-group v-model="vexOptions.backend" @change="changeBackend">
            <el-radio label="canvas">Canvas</el-radio>
            <el-radio label="svg">Svg</el-radio>
          </el-radio-group>

          <h2 class="score-control-title">
            <span>移调</span>
            <span v-text="denominator ? `(1/${denominator})` : ''"></span>
          </h2>
          <el-slider v-model="currentDenominator" :disabled="bpmDisabled"></el-slider>

          <h2 class="score-control-title">音轨</h2>
          <div v-for="instrument in instrumentLevels" :key="instrument.id">
            <span v-texxt="translateZH(instrument.name)"></span>
            <div v-for="(voice, index) in instrument.voices" :key="index">
              <el-slider v-model="voice.volume"></el-slider>
            </div>
          </div>

          <h2 class="score-control-title">
            <span>缩放</span>
            <span v-text="Math.floor(vexOptions.zoom * 100.0) + '%'"></span>
          </h2>
          <div class="ui buttons">
            <el-button @click="handleZoomIn">缩小</el-button>
            <el-button @click="handleZoomOut">放大</el-button>
          </div>

          <h2 class="score-control-title">光标</h2>
          <div class="ui buttons">
            <el-button @click="handleShowCursor">显示</el-button>
            <el-button @click="handleHideCursor">隐藏</el-button>
            <el-button @click="handleNextCursor">下一个</el-button>
            <el-button @click="handleResetCursor">重置</el-button>
          </div>
        </div>

        <el-main style="position:relative;">
          <Score
            ref="score"
            @osmdInit="osmdInit"
            @scoreLoaded="scoreLoaded"
            @zoom="scoreZoom"
            :score="selectedScore"
            :backend="vexOptions.backend"
          />
          <PlaybackControls
            :playbackEngine="pbEngine"
            :scoreTitle="scoreTitle"
            @control="handleControl"
            @jumpToStep="handleJumpToStep"
            :score="selectedScore"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import Score from "./components/Score.vue";
import PlaybackEngine from "./pbEngine/PlaybackEngine"; // self def
import PlaybackControls from "./components/PlaybackControls.vue";
import PlaybackSidebar from "./components/PlaybackSidebar.vue";
export default {
  name: "app",
  components: {
    Score,
    PlaybackControls,
    PlaybackSidebar
  },
  data() {
    return {
      pbEngine: {},
      scoreTitle: "",
      selectedScore: null,
      currentDenominator: 0,
      vexOptions: {
        backend: "canvas",
        zoom: 1.0
      }
    };
  },
  computed: {
    instrumentLevels() {
      return this.pbEngine.playbackSettings.volumes.instruments;
    },
    bpmDisabled() {
      return this.pbEngine.state === "PLAYING";
    },
    denominator() {
      return this.pbEngine.denominator;
    }
  },
  created() {
    this.pbEngine = new PlaybackEngine();
    this._createNewOsmd = true; // 是否已经渲染出score
  },
  methods: {
    osmdInit(osmd) {
      console.log("OSMD init");
      this.osmd = osmd;
      this.selectedScore =
        "http://localhost:8089/musicXML/MuzioClementi_SonatinaOpus36No1_Part1.xml";
    },
    scoreLoaded() {
      console.log("Score loaded");
      if (this.osmd.sheet.title) this.scoreTitle = this.osmd.sheet.title.text;
      this.pbEngine.loadScore(this.osmd);
    },
    scoreChanged(scoreUrl) {
      if (this.pbEngine.state === "PLAYING") this.pbEngine.stop();
      this.selectedScore = scoreUrl;
    },
    changeBackend(val) {
      print(val);
      this.vexOptions.backend = val;
    },
    handleZoomIn() {
      this.$refs.score.handleZoomIn();
    },
    handleZoomOut() {
      this.$refs.score.handleZoomOut();
    },
    handleShowCursor() {
      if (this.pbEngine.cursor) {
        this.pbEngine.cursor.show();
        this.pbEngine.cursor.updateStyle(200, "red"); // 光标风格
      } else {
        console.info(
          "无法显示光标，因为它已被禁用（例如通过DrawingParameters）."
        );
      }
    },
    handleHideCursor() {
      this.pbEngine.cursor.hide();
    },
    handleNextCursor() {
      this.pbEngine.cursor.next();
    },
    handleResetCursor() {
      this.pbEngine.cursor.reset();
    },
    scoreZoom(zoom) {
      this.vexOptions.zoom = zoom;
    },
    handlePlay(state) {
      if (state) {
        this.pbEngine.play();
      }
    },
    handleControl(state) {
      if (state) {
        switch (state) {
          case "play":
            this.pbEngine.play();
            break;
          case "pause":
            this.pbEngine.pause();
            break;
          case "stop":
            this.pbEngine.stop();
            break;

          default:
            break;
        }
      }
    },
    handleJumpToStep(val) {
      this.pbEngine.jumpToStep(val);
    },
    translateZH(str) {
      var text = "";
      switch (str) {
        case "Piano (left)":
          text = "音轨(左)";
          break;
        case "Piano (right)":
          text = "音轨(右)";
          break;

        default:
          break;
      }
      return text;
    }
  }
};
</script>

<style style="stylus">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  line-height: 1;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 240px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.person {
  display: block;
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
}
.score-control-title {
  font-size: 16px;
}
</style>
