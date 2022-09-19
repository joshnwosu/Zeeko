import { toggleContextMenu } from "../store/status";

export function displayContextMenu(e, name) {
  // console.log("Name: ", name);

  e.preventDefault();
  e.stopPropagation();
  const { clientX, clientY } = e;
  const contextMenu = document.querySelector(".contextMenu");
  const contextMenuOverlay = document.querySelector(".contextMenu-overlay");

  contextMenuOverlay.style.display = "flex";

  const positionY =
    clientY + contextMenu.scrollHeight >= window.innerHeight
      ? window.innerHeight - contextMenu.scrollHeight - 20
      : clientY;
  const positionX =
    clientX + contextMenu.scrollWidth >= window.innerWidth
      ? window.innerWidth - contextMenu.scrollWidth - 20
      : clientX;

  contextMenu.setAttribute(
    "style",
    `
      --top: ${positionY}px;
      --left: ${positionX}px;
      `
  );

  const keyframes = [
    { opacity: 0, transform: "scale(0.5) translateY(-10px)", height: 0 },
    {
      opacity: 1,
      transform: "scale(1) translateY(0px)",
      height: `${contextMenu.scrollHeight}px`,
    },
  ];

  const timing = {
    duration: 100,
    iterations: 1,
  };

  // contextMenu.animate(keyframes, timing);
  toggleContextMenu.set(name);
}
