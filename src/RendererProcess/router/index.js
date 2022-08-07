import Discover from "../screens/Discover.svelte";
import MyMusic from "../screens/MyMusic.svelte";
import RecentPlays from "../screens/RecentPlays.svelte";
import NowPlaying from "../screens/NowPlaying.svelte";
import Playlists from "../screens/Playlists.svelte";
import Favorite from "../screens/Favorite.svelte";
import Settings from "../screens/Settings.svelte";
import NotFound from "../views/NotFound.svelte";
import ArtistDetails from "../views/ArtistDetails.svelte";
import PlaylistDetails from "../views/PlaylistDetails.svelte";

export const routes = {
  "/": Discover,
  "/my-music/*": MyMusic,
  "/recent-plays": RecentPlays,
  "/now-playing": NowPlaying,
  "/playlists": Playlists,
  "/favorite": Favorite,
  "/settings": Settings,
  "/artist-details/:name": ArtistDetails,
  "/playlist-details/:name": PlaylistDetails,
  "*": NotFound,
};
