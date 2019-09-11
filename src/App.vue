<template>
  <div id="app">
    <el-container>
      <el-container direction="horizontal">
        <div class="navSide" style="width:200px;padding:10px 15px;">
          <img class="person" src="./assets/person.jpg" alt />
          <PlaybackSidebar :playbackEngine="pbEngine" />

          <h2>每分钟节拍数（BPM） {{pbEngine.denominator ? `(1/${pbEngine.denominator})` : ''}}</h2>
          <el-slider v-model="currentDenominator"></el-slider>

          <h2>音量设置（Levels）</h2>
        </div>

        <el-main>
          <Score @osmdInit="osmdInit" @scoreLoaded="scoreLoaded" :score="selectedScore" />
          <PlaybackControls :playbackEngine="pbEngine" :scoreTitle="scoreTitle" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import Score from "./components/Score.vue";
import PlaybackEngine from "./osmd/PlaybackEngine";
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
      pbEngine: new PlaybackEngine(),
      scoreTitle: "",
      selectedScore: null,
      currentDenominator: 0
    };
  },
  methods: {
    osmdInit(osmd) {
      console.log("OSMD init");
      this.osmd = osmd;
      this.selectedScore =
        "http://localhost:8081/musicXML/MuzioClementi_SonatinaOpus36No1_Part1.xml";
    },
    scoreLoaded() {
      console.log("Score loaded");
      if (this.osmd.sheet.title) this.scoreTitle = this.osmd.sheet.title.text;
      this.pbEngine.loadScore(this.osmd);
    },
    scoreChanged(scoreUrl) {
      if (this.pbEngine.state === "PLAYING") this.pbEngine.stop();
      this.selectedScore = scoreUrl;
    }
  }
};
</script>

<style style="stylus">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  line-height: 200px;
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
}
.navSide {
}
</style>
