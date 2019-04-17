export default class ServiceStatus {
  serviceType?: ServiceType;
  serviceMessage?: string;
  serviceHealth?: ServiceHealth;

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

export enum ServiceHealth {
  NOT_WORKING = 0,
  WORKING = 1,
  UNDER_MAINTENANCE = 2
}

export enum ServiceType {
  CLOUD = 0,
  CELL_COUNTER = 1,
  //APIs = 2,
  OMNI = 2,
  //IMAGE_ANALYSIS = 4,
  LUX_2 = 3
}
