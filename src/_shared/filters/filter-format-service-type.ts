import { ServiceType } from "../enums/service-type";

export default function(serviceType: ServiceType): string {
  const returnString: string = ServiceType[serviceType]
    .toLowerCase()
    .replace("_", " ");
  return capitalize(returnString);
}

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
