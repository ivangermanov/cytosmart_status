<template>
  <div>
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @mouseover="showToolTip=true; fillCircle();"
      @mouseleave="showToolTip=false; unfillCircle();"
    >
      <circle cx="7" cy="7" r="6.5" stroke="#BCCCDC" :fill="fill"></circle>
      <path
        d="M6.76 8.822C6.716 8.536 6.72333 8.27933 6.782 8.052C6.848 7.81733 6.936 7.60467 7.046 7.414C7.156 7.216 7.28067 7.03267 7.42 6.864C7.56667 6.69533 7.70233 6.53033 7.827 6.369C7.95167 6.20033 8.05433 6.03167 8.135 5.863C8.223 5.69433 8.267 5.511 8.267 5.313C8.267 5.01967 8.17533 4.77033 7.992 4.565C7.816 4.35233 7.552 4.246 7.2 4.246C6.958 4.246 6.727 4.30467 6.507 4.422C6.29433 4.532 6.10367 4.686 5.935 4.884L5.418 4.411C5.65267 4.147 5.924 3.93067 6.232 3.762C6.54733 3.586 6.90667 3.498 7.31 3.498C7.86733 3.498 8.311 3.65567 8.641 3.971C8.97833 4.279 9.147 4.708 9.147 5.258C9.147 5.5 9.103 5.72 9.015 5.918C8.927 6.116 8.817 6.303 8.685 6.479C8.56033 6.655 8.42467 6.831 8.278 7.007C8.13867 7.17567 8.00667 7.35167 7.882 7.535C7.76467 7.71833 7.673 7.91633 7.607 8.129C7.541 8.33433 7.52267 8.56533 7.552 8.822H6.76ZM7.178 11.132C6.99467 11.132 6.84067 11.0697 6.716 10.945C6.59133 10.813 6.529 10.648 6.529 10.45C6.529 10.2373 6.59133 10.0687 6.716 9.944C6.84067 9.812 6.99467 9.746 7.178 9.746C7.36133 9.746 7.51533 9.812 7.64 9.944C7.772 10.0687 7.838 10.2373 7.838 10.45C7.838 10.648 7.772 10.813 7.64 10.945C7.51533 11.0697 7.36133 11.132 7.178 11.132Z"
        fill="#829AB1"
      ></path>
    </svg>
    <tooltip-component
      :show="showToolTip"
      :tooltipHeader="tooltipHeader"
      :tooltipText="tooltipText"
    ></tooltip-component>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TooltipComponent from "@/components/TooltipComponent.vue";

@Component({
  components: {
    TooltipComponent
  }
})
export default class QuestionMark extends Vue {
  fill: string = "#FFF";
  showToolTip: boolean = false;

  @Prop() private tooltipHeader?: string;
  @Prop() private tooltipText?: string;

  private fillCircle(): void {
    this.fill = "#E5E5E5";
  }
  private unfillCircle(): void {
    this.fill = "#FFF";
  }
}
</script>
<style lang="scss" scoped>
div {
  display: inline-block;
}
</style>
