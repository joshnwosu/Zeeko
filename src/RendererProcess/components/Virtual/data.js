// reference for more info
// https://svelte.dev/repl/1c36db7c1e7e4ef2bfb04874321412e5?version=3.49.0

let id = 0;

function fill(len) {
  const fn = () => {
    const item = {
      id,
      key: `_${id}`,
      name: "Joshua",
    };
    id++;
    return item;
  };
  return Array(len)
    .fill()
    .map((_) => fn());
}

export const loadMore = () => {
  return fill(10);
};

export let loadItems = () => fill(1000);
