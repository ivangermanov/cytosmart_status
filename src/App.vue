<template>
  <div id="app">
    <div class="header">
      <div>Status</div>
    </div>
    <issues-component
      :issues="issues"
      :statuses="statuses"
      :showLoaderIssues="showLoaderIssues"
      :showLoaderHealth="showLoaderHealth"
    ></issues-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IssuesComponent from "./components/IssuesComponent.vue";
import axios, { AxiosResponse } from "axios";
import Issue from "@/classes/issue";
import ServiceStatus from "@/classes/service-status";

@Component({
  components: {
    IssuesComponent
  }
})
export default class App extends Vue {
  private issues: Issue[] = [];
  private statuses: { [type: string]: ServiceStatus } = {
    cloud: Object as ServiceStatus,
    cell_counter: Object as ServiceStatus,
    omni: Object as ServiceStatus,
    lux_2: Object as ServiceStatus
  };
  private gitHubCreator: string = "ivangermanov";
  private baseLink: string =
    "https://statuspageivan.blob.core.windows.net/statusexternal";
  private showLoaderIssues: boolean = true;
  private showLoaderHealth: boolean = true;

  created() {
    this.setIssues();
    this.setStatuses();
    setInterval(this.setIssues.bind(this), 300000);
    setInterval(this.setStatuses.bind(this), 300000);
  }

  destroyed() {}
  // methods
  setIssues(): void {
    this.showLoaderIssues = true;
    axios
      .get(
        `https://api.github.com/repos/ivangermanov/cytosmart_test/issues?creator=${
          this.gitHubCreator
        }`
      )
      .then((r: AxiosResponse) => {
        console.log(r.data);
        this.issues = [];
        for (let i = 0; i < r.data.length; i++) {
          const issue = r.data[i];
          const title = issue["title"];
          const body = issue["body"];
          const createdAt = issue["created_at"];
          const updatedAt = issue["updated_at"];
          const serviceTypes = issue["labels"].map(
            (l: any) => l.name as string
          );
          this.issues.push({ title, body, createdAt, updatedAt, serviceTypes });
        }
        this.showLoaderIssues = false;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  setStatuses(): void {
    this.showLoaderHealth = true;
    axios
      .all([
        axios.get(`${this.baseLink}/cloud.json`),
        axios.get(`${this.baseLink}/cell_counter.json`),
        axios.get(`${this.baseLink}/omni.json`),
        axios.get(`${this.baseLink}/lux_2.json`)
      ])
      .then(
        axios.spread(
          (
            cloudRes: AxiosResponse,
            cellCounterRes: AxiosResponse,
            omniRes: AxiosResponse,
            lux2Res: AxiosResponse
          ) => {
            this.statuses["cloud"] = new ServiceStatus(
              cloudRes.data["serviceType"],
              cloudRes.data["serviceMessage"],
              cloudRes.data["serviceHealth"]
            );
            this.statuses["cell_counter"] = new ServiceStatus(
              cellCounterRes.data["serviceType"],
              cellCounterRes.data["serviceMessage"],
              cellCounterRes.data["serviceHealth"]
            );
            this.statuses["omni"] = new ServiceStatus(
              omniRes.data["serviceType"],
              omniRes.data["serviceMessage"],
              omniRes.data["serviceHealth"]
            );
            this.statuses["lux_2"] = new ServiceStatus(
              lux2Res.data["serviceType"],
              lux2Res.data["serviceMessage"],
              lux2Res.data["serviceHealth"]
            );
            this.showLoaderHealth = false;
          }
        )
      )
      .catch(err => {
        console.log(err);
      });
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Source Sans Pro", sans-serif;
  color: #334e68;
}

body {
  margin: 0;
}

.header {
  color: #fff;
  z-index: 0;
  height: 105px;
  background-image: url("~@/assets/images/header.png");
  width: 100%;
  font-weight: bold;
  font-size: 36px;
  line-height: normal;
}

.header > div {
  position: absolute;
  top: 30px;
  left: 175px;
}

:root {
  font-size: 16px;
}
</style>
