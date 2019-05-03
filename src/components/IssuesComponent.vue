<template>
  <div v-if="!showLoaderIssues">
    <div class="issue" v-for="(issue, i) in this.issues" :key="i">
      <div class="title">{{issue.title}}</div>
      <div>
        <span class="date">
          <span>{{issue.createdAt | date}}</span>
          <span
            class="updated"
            v-if="issue.createdAt != issue.updatedAt"
          >, updated at {{issue.updatedAt | date}}</span>
        </span>
        <span>
          <a
            class="serviceType"
            :class="serviceType"
            v-for="(serviceType, j) in issue.serviceTypes"
            :key="j"
          >{{serviceType}}</a>
        </span>
      </div>
      <vue-markdown class="body">{{issue.body}}</vue-markdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import StatusesComponent from "@/components/StatusesComponent.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import VueMarkdown from "vue-markdown";
import Issue from "@/classes/issue";
import { ServiceHealth } from "@/classes/enums/service-health";

@Component({
  components: {
    StatusesComponent,
    LoaderComponent,
    VueMarkdown
  }
})
export default class IssuesComponent extends Vue {
  @Prop({ default: [] }) private issues!: Issue[];
  @Prop({ default: true }) private showLoaderIssues = true;
}
</script>

<style lang="scss">
.serviceType {
  border-radius: 2px;
  box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
  font-size: 12px;
  font-weight: 600;
  margin: 5px;
  height: 20px;
  line-height: 15px;
  padding: 0.15em 4px;
  display: inline-block;
  text-decoration: none;
  box-sizing: border-box;
}
.cloud {
  color: #000000;
  background-color: #a2eeef;
}

.cell_counter {
  color: #ffffff;
  background-color: #7057ff;
}

.lux_2 {
  background-color: #c6fc99;
  color: #000000;
}

.omni {
  color: #ffffff;
  background-color: #d73a4a;
}

.issue {
  border-bottom: 1px solid #f0f4f8;
  margin-top: 10px;
}

.title {
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
}

.date {
  color: #9fb3c8;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
}

.updated {
  font-weight: bold;
}
</style>
