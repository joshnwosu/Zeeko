export function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
// var arr = [2, 11, 37, 42];
// shuffle(arr);
// console.log(arr);

export function shuffleArrayTwo(unshuffled) {
  let shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
}
// let unshuffled = ["hello", "a", "t", "q", 1, 2, 3, { cats: true }];
// shuffleArrayTwo(unshuffled)
// console.log(unshuffled)

export function removeDuplicates(targetArray, prop) {
  return targetArray.filter((obj, index, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index;
  });
}
