# MusixXML 介绍

musicxml 有两类元素：一类用来标识音乐应该怎样播放，这些元素通常可以被用来导出 MIDI 文件。另一类用来标识音符在五线谱等上的位置，即谱面，这些元素可以导出 xml 格式的文件，Finale 软件可以渲染为可读的谱面。
[资料](https://blog.csdn.net/MrNoboday/article/details/85339820)

https://blog.csdn.net/MrNoboday/article/details/89224816

## musicxml 关键元素

第一部分先来接触有关导出 midi 的元素

```xml
<attributes>
    <divisions>24</divisions>
      <key>
        <fifths>-3</fifths>
        <mode>minor</mode>
      </key>
    <time>
      <beats>3</beats>
      <beat-type>4</beat-type>
    </time>
</attributes>
```

## 关键字

1. divisions

   - 通常用来标识几分音符：全音符、二分音符、四分音符等等。musicxml 中的 division 定义了四分音符的时值，其他音符通过跟 division 的倍数关系就可以确认 duration

2. key

   - key 定义了调号。其中的 fifth 标签中的数字标识升降，比如-3 标识降 E 调。然后其中的 mode 标签标识的就是用来区分记法相同的大小调式的。

3. time

   - time 标签是用来标识拍号的。其中 beat 标签标识分子，beat_type 用来标识分母。在上例中，标识 3/4，以四分音符为一拍，每小节有三拍。

```dash
<note>
    <pitch>
      <step>E</step>
      <alter>-1</alter>
	  <octave>5</octave>
    </pitch>
    <duration>24</duration>
    <tie type="start"/>
    <lyric>
      <syllabic>end</syllabic>
      <text>meil</text>
      <extend/>
    </lyric>
  </note>
```

4. note

   - 1.pitch 在每个 note 中 pitch 被分成三个子标签用来标识音：step、alter、octave
     step 标识：A-G 中的某个音符
     alter 标识：这个音的升降（-1 降调 1 升调）
     octave 标识：这个音所在八度（4 标识中央 C）
   - 2.pitch
