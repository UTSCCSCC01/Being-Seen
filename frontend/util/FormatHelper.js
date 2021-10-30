export function capitalize(str) {
  return (str && str[0].toUpperCase() + str.slice(1)) || "";
}

/**
 * @function getTags function responsible for extracting and formatting names of tags for a shelter
 * @module getTags getTags
 * @description function responsible for extracting and formatting names of tags for a shelter
 * @param {Tag[]} tags array of tags for a shelter
 *
 */
export function getTags(tags) {
  let toRet = "";
  for (let i = 0; i < tags.length; i += 1) {
    toRet += tags[i].tagName;
    if (i !== tags.length - 1) toRet += ", ";
  }
  return toRet;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${weekdays[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}
