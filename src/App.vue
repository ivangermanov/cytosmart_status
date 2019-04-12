<template>
  <div id="app">
    <div class="header">
      <div>Status</div>
    </div>
    <issues-component :issues="issues"></issues-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IssuesComponent from "./components/IssuesComponent.vue";
import axios, { AxiosResponse } from "axios";
import Issue from "@/issue";

@Component({
  components: {
    IssuesComponent
  }
})
//@ts-ignore
export default class App extends Vue {
  issues: Issue[] = [];

  beforeMount() {
    this.getIssues();
  }

  // methods
  getIssues() {
    axios
      .get("https://api.github.com/repos/ivangermanov/cytosmart_test/issues")
      .then((r: AxiosResponse) => {
        for (let i = 0; i < r.data.length; i++) {
          const issue = r.data[i];
          const title = issue["title"];
          const body = issue["body"];
          const createdAt = issue["created_at"];
          const updatedAt = issue["updated_at"];
          this.issues.push({ title, body, createdAt, updatedAt });
        }
      });
    console.log(this.issues);
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
  font-weight: bold;
  font-size: 36px;
  line-height: normal;
}

.header > div {
  position: relative;
  top: 30px;
  left: 175px;
}

:root {
  font-size: 16px;
}
</style>
