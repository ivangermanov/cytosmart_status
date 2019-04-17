export default function(d: string) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  };
  return new Date(d).toLocaleString("en-gb", options);
}
