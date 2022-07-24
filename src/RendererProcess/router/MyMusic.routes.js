import NotFound from "../views/NotFound.svelte";
import About from "../views/About.svelte";
import Author from "../views/Author.svelte";
import Home from "../views/Home.svelte";
import Book from "../views/Book.svelte";

export const routes = {
  "/songs": Home,
  "/artists": About,
  "/albums": Book,
  "/folders": NotFound,
};
