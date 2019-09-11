<template>
  <div>
    <div>
      <span class="el-dropdown-link">选择乐器</span>
      <el-select v-model="value" placeholder="请选择" @change="changeInstrument">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import instruments from "../instruments.js";
export default {
  components: {},
  data() {
    return {
      instruments: instruments,
      options: [
        {
          value: "选项1",
          label: "大提琴"
        },
        {
          value: "选项2",
          label: "小提琴"
        },
        {
          value: "选项3",
          label: "手风琴"
        },
        {
          value: "选项4",
          label: "钢琴"
        }
      ],
      value: ""
    };
  },
  props: ["instrument"],
  methods: {
    changeInstrument(val) {
      this.$emit("changeInstrument", val);
    }
  }
};
</script>

<style  scoped>
.el-dropdown-link {
  font-size: 16px;
}
</style>
