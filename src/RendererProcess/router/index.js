import MyMusic from "../screens/MyMusic.svelte";
import RecentPlays from "../screens/RecentPlays.svelte";
import NowPlaying from "../screens/NowPlaying.svelte";
import Playlists from "../screens/Playlists.svelte";
import Favorite from "../screens/Favorite.svelte";
import NotFound from "../views/NotFound.svelte";

import About from "../views/About.svelte";
import Author from "../views/Author.svelte";
import Home from "../views/Home.svelte";
import Book from "../views/Book.svelte";

export const routes = {
  "/my-music/*": MyMusic,
  "/recent-plays": RecentPlays,
  "/now-playing": NowPlaying,
  "/playlists": Playlists,
  "/favorite": Favorite,
  // "/music/*": About,
  "*": NotFound,
};

// export const routes = [
//   { name: "#/", componet: MyMusic },
//   { name: "#/recent-plays", componet: RecentPlays },
//   { name: "#/now-playing", componet: NowPlaying },
//   { name: "#/playlists", componet: Playlists },
//   { name: "*", componet: NotFound },
// ];
