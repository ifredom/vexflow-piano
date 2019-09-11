
<template>
  <div>
    <!-- hahahha -->
    <InstrumentControl @changeInstrument="changeInstrument"></InstrumentControl>
  </div>
</template>

<script>
import InstrumentControl from "./InstrumentControl";
export default {
  props: {
    playbackEngine: Object
  },
  components: {
    InstrumentControl
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