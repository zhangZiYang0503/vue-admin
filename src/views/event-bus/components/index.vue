<template>
  <div>
    <el-button @click="add()">加</el-button>
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
    //EventBus.$off("add", this.add);
  },
  mounted() {},
  methods: {
    add() {
      EventBus.$emit("add", {
        num: this.num,
        deg: this.deg
      });
      console.log("我add了");
      console.log(EventBus, "===");
    }
  },

  beforeDestroy() {
    // EventBus.$off("add", this.handle);
  }
};
</script>
<style lang="scss" scoped></style>
