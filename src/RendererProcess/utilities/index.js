export const defaultCoverArt = "./assets/images/default-cover-art.png";

export const cardSlideDemo = [
  {
    id: 1,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/900/900.webp?random=1",
  },
  {
    id: 2,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/1240/900.webp?random=2",
  },
  {
    id: 3,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/1800/900.webp?random=3",
  },
  {
    id: 4,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/1540/900.webp?random=4",
  },
  {
    id: 5,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/540/900.webp?random=5",
  },
  {
    id: 6,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/1140/900.webp?random=6",
  },
  {
    id: 7,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/1640/900.webp?random=7",
  },
  {
    id: 8,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/1840/900.webp?random=8",
  },
  {
    id: 9,
    header: "What is Slidy?",
    text: "SLIDY – simple configurable carousel component on SvelteJS",
    src: "https://picsum.photos/3000/900.webp?random=9",
  },
];

export const cleanUp = () => {
  let contextMenu = document.querySelector(".contextMenu");
  let contextMenuOverlay = document.querySelector(".contextMenu-overlay");
  if (contextMenu || contextMenuOverlay) {
    contextMenu.setAttribute("style", `height: 0px;`);
    contextMenuOverlay.style.display = "none";
  }
};

export function sortArrayOfObjects(targetArray, param) {
  function compare(a, b) {
    if (a[`${param}`] < b[`${param}`]) {
      return -1;
    }
    if (a[`${param}`] > b[`${param}`]) {
      return 1;
    }
    return 0;
  }
  targetArray.sort(compare);
}

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

export function shuffleArrayTwo(unshuffled) {
  let shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
}

export function shuffleArrayThree(array) {
  const arrayCopy = [...array];
  let currentIndex = arrayCopy.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }

  return arrayCopy;
}

export function removeDuplicates(targetArray, prop) {
  return targetArray.filter((obj, index, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index;
  });
}

// https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

// https://stackoverflow.com/questions/51009090/sort-and-group-objects-alphabetically-by-first-letter-javascript
export function sortAndGroupAlphabetically(rawData) {
  let data = rawData
    // .sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }))
    .reduce((r, e) => {
      // get first letter of name of current element
      let group = isNumeric(e.name[0].toUpperCase())
        ? "#"
        : e.name[0].toUpperCase();
      // if there is no property in accumulator with this letter create it
      if (!r[group]) r[group] = { group, children: [e] };
      // if there is push current element to children array for that letter
      else r[group].children.push(e);
      // return accumulator
      return r;
    }, {});

  // since data at this point is an object, to get array of values
  // we use Object.values method
  let result = Object.values(data);
  console.log(result);

  return result;
}
