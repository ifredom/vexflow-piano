import Soundfont from "soundfont-player";
import {
  OpenSheetMusicDisplay
} from 'opensheetmusicdisplay';

export default class PlaybackEngine {

  // 音频API: https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext
  constructor() {
    this.audioContext = new AudioContext();
  }


  loadInstrument(instrumentName) {
    Soundfont.instrument(this.audioContext, 'acoustic_grand_piano').then(function (piano) {
      piano.play('C4')
    })
  }

}
