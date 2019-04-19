<template>
  <transition name="fade">
    <div
      v-show="show"
      class="main-div absolute bg border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md"
      role="alert"
    >
      <div class="flex">
        <div class="py-1">
          <svg
            class="h-6 w-6 text-teal mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="#1961a4"
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="tooltip-header">{{tooltipHeader}}</p>
          <p class="text-sm">{{tooltipText}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TooltipComponent extends Vue {
  @Prop() private show: boolean = false;
  @Prop() private tooltipHeader?: string;
  @Prop() private tooltipText?: string;
}
</script>
<style lang="scss" scoped>
.tooltip-header {
  margin: 6px 0px;
}

.main-div {
  height: auto;
  min-height: 100px;
  width: 84%;
  top: 85%;
  left: 2%;
  z-index: 1;
}
.text-teal-darkest {
  color: #0d3331;
}
.shadow-md {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}
.absolute {
  position: absolute;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.border-t-4 {
  border-top-width: 4px;
}
.rounded-b {
  border-radius: 10px 10px 5px 5px;
}
.border-teal {
  border-color: #1961a4;
}
.bg {
  background-color: #fbfbfb;
}
.text-sm {
  font-size: 0.875rem;
}
*,
::after,
::before {
  border-width: 0;
  border-style: solid;
  border-color: #dae1e7;
}
*,
::after,
::before {
  box-sizing: inherit;
}
.main-div {
  display: block;
}

.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.w-6 {
  width: 1.5rem;
}
.mr-4 {
  margin-right: 1rem;
}
.h-6 {
  height: 1.5rem;
}
@media (max-width: 576px) {
  .main-div {
    width: 90%;
  }
}
</style>
