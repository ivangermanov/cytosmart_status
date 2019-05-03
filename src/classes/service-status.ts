import { ServiceType } from "@/classes/enums/service-type";
import { ServiceHealth } from "@/classes/enums/service-health";
export default class ServiceStatus {
  public serviceType?: ServiceType;
  public serviceMessage?: string;
  public serviceHealth?: ServiceHealth;

  constructor(
    serviceType: ServiceType,
    serviceMessage: string,
    serviceHealth: ServiceHealth
  ) {
    this.serviceType = serviceType;
    this.serviceMessage = serviceMessage;
    this.serviceHealth = serviceHealth;
  }
}
