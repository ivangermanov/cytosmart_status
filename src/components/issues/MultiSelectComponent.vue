<template>
  <div>
    Filter by service
    <multiselect
      :close-on-select="false"
      :preserve-search="false"
      :preselect-first="false"
      :allow-empty="true"
      v-model="value"
      label="label"
      track-by="type"
      :options="options"
      :multiple="true"
    ></multiselect>
    <pre class="language-json"><code>{{ value }}</code></pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Multiselect from "vue-multiselect";
import { ServiceType } from "@/_shared/enums/service-type";
import FormatServiceType from "@/_shared/filters/filter-format-service-type";

@Component({
  components: {
    Multiselect
  }
})
export default class MultiSelectComponent extends Vue {
  private options: Array<{}> = [
    {
      type: ServiceType.CLOUD,
      label: this.formatServiceType(ServiceType.CLOUD)
    },
    {
      type: ServiceType.CELL_COUNTER,
      label: this.formatServiceType(ServiceType.CELL_COUNTER)
    },
    { type: ServiceType.OMNI, label: this.formatServiceType(ServiceType.OMNI) },
    {
      type: ServiceType.LUX_2,
      label: this.formatServiceType(ServiceType.LUX_2)
    }
  ];

  private value: string = "";

  formatServiceType(serviceType: ServiceType): string {
    return this.$parent.$options.filters!["format-service-type"](serviceType);
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
