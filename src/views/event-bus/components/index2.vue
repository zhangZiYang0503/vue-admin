<template>
  <div>
    <el-button @click="less()">减</el-button>
  </div>
</template>
<script>
import { EventBus } from "./event-bus.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      num: 1,
      deg: 180
    };
  },
  computed: {},
  watch: {},
  created() {
    //  EventBus.$off("less");
  },
  mounted() {},
  methods: {
    less() {
      EventBus.$emit("less", {
        num: this.num,
        deg: this.deg
      });
      console.log("我deel了");
    }
  },
  beforeDestroy() {
    //   EventBus.$off("less", this.less);
  }
};
</script>
<style lang="scss" scoped></style>
