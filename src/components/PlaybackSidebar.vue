
<template>
  <div>
    <!-- hahahha -->
    <BmpSlider @changeInstrument="changeInstrument"></BmpSlider>
  </div>
</template>

<script>
import BmpSlider from "./BmpSlider";
export default {
  props: {
    playbackEngine: Object
  },
  components: {
    BmpSlider
  },
  data() {
    return {};
  },
  computed: {
    instrumentLevels() {
      return this.playbackEngine.playbackSettings.volumes.instruments;
    },
    bpmDisabled() {
      return this.playbackEngine.state === "PLAYING";
    }
  },
  methods: {
    changeInstrument(val) {
      console.log(val);
    }
  }
};
</script>

<style>
</style>