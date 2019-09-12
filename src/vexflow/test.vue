<template>
  <div>
    <div id="score-target"></div>
  </div>
</template>

<script>
import Vex from "vexflow";
export default {
  data() {
    return {
      vex: new Vex.Flow()
    };
  },
  mounted() {
    var scoreDom = document.getElementById("score-target");
    var canvas = document.createElement("canvas");
    this.vex.Renderer(canvas, this.getBackendType());
  },
  methods: {
    getBackendType() {
      return Vex.Flow.Renderer.Backends.CANVAS;
    }
  }
};
</script>

<style>
</style>