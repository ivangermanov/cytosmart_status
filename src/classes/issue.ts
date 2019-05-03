import { ServiceType } from "@/classes/enums/service-type";
export default class Issue {
  public title: string;
  public body: string;
  public createdAt: string;
  public updatedAt: string;
  public serviceTypes?: ServiceType[];

  constructor(
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    serviceTypes?: ServiceType[]
  ) {
    this.title = title;
    this.body = body;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.serviceTypes = serviceTypes;
  }
}
