<template>
  <div v-show="!showLoaderIssues">
    <multi-select-component @update-selected-services="updateSelectedServices"></multi-select-component>
    <div v-if="selectedIssues.length != 0">
      <div class="issue" v-for="(issue, i) in selectedIssues" :key="i">
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
              :class="ServiceType[serviceType].toLowerCase()"
              v-for="(serviceType, j) in issue.serviceTypes"
              :key="j"
            >{{serviceType | format-service-type}}</a>
          </span>
        </div>
        <vue-markdown class="body">{{issue.body}}</vue-markdown>
      </div>
    </div>
    <div v-else>
      <h2>No issues to display.</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoaderComponent from "@/components/LoaderComponent.vue";
import VueMarkdown from "vue-markdown";
import MultiSelectComponent from "@/components/issues/MultiSelectComponent.vue";
import { ServiceType } from "@/_shared/enums/service-type";
import Issue from "@/_shared/classes/issue";

@Component({
  components: {
    LoaderComponent,
    VueMarkdown,
    MultiSelectComponent
  }
})
export default class IssuesComponent extends Vue {
  @Prop({ default: [] }) private issues!: Issue[];
  @Prop({ default: true }) private showLoaderIssues = true;
  private selectedServices: ServiceType[] = [];
  private ServiceType = ServiceType;

  // computed
  get selectedIssues() {
    if (this.selectedServices.length == 0) {
      return this.issues;
    } else if (this.selectedServices.length == 4) {
      return this.issues.filter(i => i.serviceTypes.length === 0);
    } else {
      return this.issues.filter(i =>
        this.selectedServices.every(selectedService =>
          i.serviceTypes.includes(selectedService)
        )
      );
    }
  }
  // method(s)
  updateSelectedServices(newSelectedServices: ServiceType[]): void {
    this.selectedServices = newSelectedServices;
  }
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
  // text-transform: capitalize;
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
