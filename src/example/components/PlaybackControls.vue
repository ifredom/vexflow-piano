<template>
  <div class="control-container">
    <el-slider
      class="control-progress"
      v-model="playbackEngine.currentIterationStep"
      @change="changeStep"
    ></el-slider>
    <div class="control-info">
      <span class="title">{{scoreTitle}}</span>
      <i
        class="btn el-icon-sunset"
        v-if="playbackEngine.state !== 'PLAYING'"
        @click="controls('play')"
      ></i>
      <i class="btn el-icon-sunrise" v-else @click="controls('pause')"></i>
      <i class="btn el-icon-lightning" @click="controls('stop')"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playbackEngine", "scoreTitle"],
  data() {
    return {};
  },
  methods: {
    changeStep(val) {
      this.$emit("jumpToStep", val);
    },
    controls(state) {
      if (!state) return;
      this.$emit("control", state);
    },

    format() {
      return "";
    }
  }
};
</script>

<style scoped>
.control-container {
  position: fixed;
  bottom: 20px;
  left: 260px;
  max-width: 560px;
  padding: 20px;
  background-color: #eeeed1;
}
.control-progress {
  position: absolute;
  top: -16px;
  left: 0;
  width: 100%;
}
.title {
  font-size: 28px;
  line-height: 1;
}
.control-info {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.btn {
  font-size: 30px;
  margin-left: 20px;
}
</style>