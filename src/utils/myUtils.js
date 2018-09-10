import { aoinData } from "./data";

export function getRandomArrayElements(arr, count) {
  if (arr.length <= count) {
    return arr;
  }
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

export function getSite(alias) {
  const arr = alias.split("");
  let actual = [];
  arr.forEach((char, index) => {
    if (
      aoinData.indexOf(char) === -1 &&
      aoinData.indexOf(arr[index + 1]) === -1
    ) {
      //当前不是小、下个不是小
      actual.push(char);
    } else if (aoinData.indexOf(char) === -1) {
      //当前不是小
      actual.push(char + arr[index + 1]);
    }
  });
  return actual
}
