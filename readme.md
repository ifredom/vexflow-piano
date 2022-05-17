# 使用musicxml渲染乐谱的交互式SDK

(Purpose of the project：An interactive SDK rendered using musicxml)

project base with OpenSheetMusicDisplay ,功能介绍(Function introduction)：

1. 选择乐曲，渲染乐谱,实时播放，暂停，调音（Select music, render music score, play in real time, pause and tune）
2. 接收 midi 信号，根据 midi 信号实时移动光标（Receive the MIDI signal and move the cursor in real time according to the MIDI signal）
3. 截选乐谱.上传乐谱信息（Cut the score Upload music score information）

## osmd 公共函数分类

1. AJAX http 请求

2. Cursor 光标

3. OpenSheetMusicDisplay osmd 库

4. IOSMDOptions osmd 配置参数

## OSMDOptions 配置参数 ： OpenSheetMusicDisplay/OSMDOptions.ts:9

defaultColorNotehead 符头 bool

drawUpToMeasureNumber 渲染小节数 number

## 单词解释

- Accessors 访问器，访问函数

- clef 谱号

### 参考资料
[VexFlow](https://github.com/0xfe/vexflow)
[alphatab](https://www.alphatab.net/docs/showcase/introduction/)
[opensheetmusicdisplay](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay)

