<template>
  <div class="container flex-container">
    <div class="flex-item relative">
      <h1>Issues</h1>
      <loader-component :show="showLoaderIssues"></loader-component>
      <div v-if="!showLoaderIssues">
        <div class="issue" v-for="(issue, i) in this.issues" :key="i">
          <div class="title">{{issue.title}}</div>
          <div class="date">
            {{issue.createdAt | date}}
            <label
              class="updated"
              v-if="issue.createdAt != issue.updatedAt"
            >, updated at {{issue.updatedAt | date}}</label>
          </div>
          <vue-markdown class="body">{{issue.body}}</vue-markdown>
        </div>
      </div>
    </div>
    <div class="flex-item status relative sticky">
      <h1>Services Health</h1>
      <loader-component :show="showLoaderHealth"></loader-component>
      <div v-if="!showLoaderHealth">
        <div>
          <div class="table-services">
            <div class="table-item border-bottom border-right relative">
              <div>
                Cloud
                <question-mark
                  v-show="statuses.cloud.serviceMessage != null"
                  :tooltipHeader="'Cloud message'"
                  :tooltipText="statuses.cloud.serviceMessage"
                />
              </div>
              <div>
                <cross-mark v-if="statuses.cloud.serviceHealth == ServiceHealth.NOT_WORKING"/>
                <tick-mark v-else-if="statuses.cloud.serviceHealth == ServiceHealth.WORKING"/>
                <maintenance-mark
                  v-else-if="statuses.cloud.serviceHealth == ServiceHealth.UNDER_MAINTENANCE"
                />
                <warning-mark v-else-if="statuses.cloud.serviceHealth == ServiceHealth.WARNING"/>
              </div>
            </div>
            <div class="table-item border-bottom relative">
              <div>
                Cell counter
                <question-mark
                  v-show="statuses.cell_counter.serviceMessage != null"
                  :tooltipHeader="'Cell counter message'"
                  :tooltipText="statuses.cell_counter.serviceMessage"
                />
              </div>
              <cross-mark v-if="statuses.cell_counter.serviceHealth == ServiceHealth.NOT_WORKING"/>
              <tick-mark v-else-if="statuses.cell_counter.serviceHealth == ServiceHealth.WORKING"/>
              <maintenance-mark
                v-else-if="statuses.cell_counter.serviceHealth == ServiceHealth.UNDER_MAINTENANCE"
              />
              <warning-mark
                v-else-if="statuses.cell_counter.serviceHealth == ServiceHealth.WARNING"
              />
            </div>
            <!-- <div class="table-item border-bottom border-right">
            <div>
              APIs
              <question-mark/>
            </div>

            <tick-mark/>
            </div>-->
            <div class="table-item border-right relative">
              <div>
                Omni
                <question-mark
                  v-show="statuses.omni.serviceMessage != null"
                  :tooltipHeader="'Omni message'"
                  :tooltipText="statuses.omni.serviceMessage"
                />
              </div>
              <cross-mark v-if="statuses.omni.serviceHealth == ServiceHealth.NOT_WORKING"/>
              <tick-mark v-else-if="statuses.omni.serviceHealth == ServiceHealth.WORKING"/>
              <maintenance-mark
                v-else-if="statuses.omni.serviceHealth == ServiceHealth.UNDER_MAINTENANCE"
              />
              <warning-mark v-else-if="statuses.omni.serviceHealth == ServiceHealth.WARNING"/>
            </div>
            <!-- <div class="table-item border-right">
            <div>
              Image analysis
              <question-mark/>
            </div>
            <maintenance-mark/>
            </div>-->
            <div class="table-item relative">
              <div>
                Lux 2
                <question-mark
                  v-show="statuses.lux_2.serviceMessage != null"
                  :tooltipHeader="'Lux 2 message'"
                  :tooltipText="statuses.lux_2.serviceMessage"
                />
              </div>
              <cross-mark v-if="statuses.lux_2.serviceHealth == ServiceHealth.NOT_WORKING"/>
              <tick-mark v-else-if="statuses.lux_2.serviceHealth == ServiceHealth.WORKING"/>
              <maintenance-mark
                v-else-if="statuses.lux_2.serviceHealth == ServiceHealth.UNDER_MAINTENANCE"
              />
              <warning-mark v-else-if="statuses.lux_2.serviceHealth == ServiceHealth.WARNING"/>
            </div>
          </div>
        </div>
        <div class="services-legend">
          <div class="services-legend-item">
            <tick-mark style="margin-right: 0.5rem"/>
            <div>Working properly</div>
          </div>
          <div class="services-legend-item">
            <cross-mark style="margin-right: 0.5rem"/>
            <div>Not working</div>
          </div>
          <div class="services-legend-item">
            <maintenance-mark style="margin-right: 0.5rem"/>
            <div>Under maintenance</div>
          </div>
          <div class="services-legend-item">
            <warning-mark style="margin-right: 0.5rem"/>
            <div>Warning</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoaderComponent from "@/components/LoaderComponent.vue";
import VueMarkdown from "vue-markdown";
import Issue from "@/classes/issue";
import QuestionMark from "@/SVGs/QuestionMark.vue";
import TickMark from "@/SVGs/TickMark.vue";
import CrossMark from "@/SVGs/CrossMark.vue";
import MaintenanceMark from "@/SVGs/MaintenanceMark.vue";
import WarningMark from "@/SVGs/WarningMark.vue";
import ServiceStatus, { ServiceHealth } from "@/classes/service-status";

@Component({
  components: {
    LoaderComponent,
    VueMarkdown,
    QuestionMark,
    TickMark,
    CrossMark,
    MaintenanceMark,
    WarningMark
  }
})
export default class IssuesComponent extends Vue {
  @Prop({ default: [] }) private issues!: Issue[];
  @Prop({ default: {} }) private statuses!: { [type: string]: ServiceStatus };
  @Prop({ default: true }) private showLoaderIssues = true;
  @Prop({ default: true }) private showLoaderHealth = true;

  private ServiceHealth = ServiceHealth;
}
</script>

<style lang="scss">
.relative {
  position: relative;
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.flex-container {
  display: flex;
  list-style: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  margin-top: 7%;
  width: 100%;
}

.flex-item {
  width: 46%;
  margin-left: 2%;
}

.flex-item:nth-of-type(1) {
}

.sticky {
  position: sticky;
  top: 100px;
  align-self: flex-start;
}

.issue {
  @extend .border-bottom;
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

.table-services {
  height: 128px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 4px solid #1961a4;
  border-bottom: 1px solid #ffffff;
  border-radius: 10px 10px 5px 5px;
  box-shadow: 0px 4px 24px rgba(25, 97, 164, 0.12),
    0px 2px 5px rgba(0, 0, 0, 0.12);
}

.table-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  align-self: center;
  color: #243b53;
  font-size: 1.5rem;
  line-height: normal;
}

.services-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  color: #627d98;
  font-size: 1.125rem;
  line-height: normal;
}

.services-legend-item {
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
}

.border-right {
  border-right: 1px solid #f0f4f8;
}

.border-bottom {
  border-bottom: 1px solid #f0f4f8;
}

.updated {
  font-weight: bold;
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
  .table-item {
    font-size: 1.5rem;
  }
}

@media (max-width: 992px) {
  .container {
    max-width: 960px;
  }
  .table-item {
    font-size: 1.3rem;
  }
}

@media (max-width: 877px) {
  .container {
    max-width: 960px;
  }
  .table-item {
    font-size: 1.5rem;
  }
  .table-services {
    height: 384px;
    grid-template-columns: auto;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (max-width: 576px) {
  .container {
    max-width: 540px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .flex-container {
    flex-wrap: wrap;
  }
  .flex-item {
    width: 100%;
    padding-right: 2%;
  }
  .sticky {
    position: static;
  }
  .flex-item:nth-of-type(1) {
    order: 2;
  }
  .flex-item:nth-of-type(2) {
    order: 1;
  }
  .table-services {
    height: 384px;
    grid-template-columns: auto;
  }
}
</style>
