import Discover from "../screens/Discover.svelte";
import MyMusic from "../screens/MyMusic.svelte";
import RecentPlays from "../screens/RecentPlays.svelte";
import MostPlayed from "../screens/MostPlayed.svelte";
import Playlists from "../screens/Playlists.svelte";
import Settings from "../screens/Settings.svelte";
import NotFound from "../views/NotFound.svelte";
import ArtistDetails from "../views/ArtistDetails.svelte";
import AlbumDetails from "../views/AlbumDetails.svelte";
import PlaylistDetails from "../views/PlaylistDetails.svelte";
import FolderDetails from "../views/FolderDetails.svelte";

export const routes = {
  "/": Discover,
  "/my-music/*": MyMusic,
  "/recent-plays": RecentPlays,
  "/most-played": MostPlayed,
  "/playlists": Playlists,
  "/settings": Settings,
  "/artist-details/:name": ArtistDetails,
  "/album-details/:name": AlbumDetails,
  "/playlist-details/:name": PlaylistDetails,
  "/folder-details/:name": FolderDetails,
  "*": NotFound,
};
