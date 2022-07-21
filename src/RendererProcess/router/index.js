import About from "../views/About.svelte";
import Author from "../views/Author.svelte";
import Home from "../views/Home.svelte";
import NotFound from "../views/NotFound.svelte";
import Book from "../views/Book.svelte";

export const routes = {
  // Exact path
  "/": Home,
  "/about": About,
  // Using named parameters, with last being optional
  "/author/:first/:last?": Author,
  "/book": Book,
  // Catch-all
  // This is optional, but if present it must be the last
  "*": NotFound,
};
