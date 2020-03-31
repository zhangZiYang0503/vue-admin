<template>
  <div>
    <h2>总数</h2>
    <div class="container">
      <div class="front">
        <div class="increment">
          <IncrementCount />
        </div>
        <div class="decrement">
          <DecreaseCount />
        </div>
        <div class="show-front">{{ fontCount }}</div>
      </div>

      <div class="back">
        <div class="increment">
          <IncrementCount />
        </div>
        <div class="decrement">
          <DecreaseCount />
        </div>
        <div class="show-back">{{ backCount }}</div>
      </div>
    </div>
    <el-button @click="del">销毁</el-button>
  </div>
</template>
<script>
import IncrementCount from "./components/index";
import DecreaseCount from "./components/index2";
import { EventBus } from "./components/event-bus.js";

export default {
  components: {
    IncrementCount,
    DecreaseCount
  },
  props: {},
  data() {
    return {
      degValue: 0,
      fontCount: 0,
      backCount: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    //
    EventBus.$on("add", ({ num, deg }) => {
      console.log(`我是sum页面add` + num, deg);
      this.fontCount += num;
      console.log("我是sum页面add结果", this.fontCount);
      this.$nextTick(() => {
        this.backCount += num;
        this.degValue += deg;
      });
      console.log("我是sum页面add");
    });
    EventBus.$on("less", ({ num, deg }) => {
      console.log(`我是sum页面less` + num, deg);
      this.fontCount -= num;
      this.$nextTick(() => {
        this.backCount -= num;
        this.degValue -= deg;
      });
      console.log("我是sum页面less");
    });
    console.log(EventBus.$on, "===");
  },
  methods: {
    del() {
      // EventBus.$off("add", {});
      // EventBus.$off("less", {});
      console.log(EventBus, "=2==");
    }
  },
  beforeDestroy() {
    // EventBus.$off("less", this.less);
  }
};
</script>
<style lang="scss" scoped>
.front .back {
  width: 100%;
}
.increment .decrement {
  div {
    float: left;
  }
  float: left;
}
</style>
