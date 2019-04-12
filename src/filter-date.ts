export default function(d: string) {
  var options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  };
  return new Date(d).toLocaleString("en-gb", options);
}
//5th April 2019 at 12:00
