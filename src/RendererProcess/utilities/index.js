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

// // example 1
// // Used like so
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
// // example 2
// // Used like so
// let unshuffled = ["hello", "a", "t", "q", 1, 2, 3, { cats: true }];
// shuffleArrayTwo(unshuffled)
// console.log(unshuffled)

export function preventBubbling(e) {
  // Please don't touch this code
  // Prevents bubbling when clicked on BUTTON elements
  // You might want to update the function to accept the type
  // of tags you would like to prevent
  // example: preventBubbling(e, tag);
  // notice we ain't passing tag in the function, and
  // we also hardcoded "BUTTON" tag
  // we could the replace "BUTTON" to tag in
  // our update function

  if (
    e.target.tagName === "BUTTON" ||
    e.target.parentElement.tagName === "BUTTON"
  ) {
    return false;
  }
}
