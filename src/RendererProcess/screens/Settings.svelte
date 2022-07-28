<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import { Tabs, TabList, TabPanel, Tab } from "../components/MusicTab";
</script>

<main class="page" transition:fade>
  <ScreenHeader />
  <div class="screen-view">
    <p>Settings</p>

    <Tabs>
      <TabList>
        <Tab>Songs</Tab>
        <Tab>Artists</Tab>
        <Tab>Albums</Tab>
        <Tab>Folders</Tab>
      </TabList>

      <TabPanel>
        <h2>First panel</h2>
      </TabPanel>

      <TabPanel>
        <h2>Second panel</h2>
      </TabPanel>

      <TabPanel>
        <h2>Third panel</h2>
      </TabPanel>

      <TabPanel>
        <h2>Forth panel</h2>
      </TabPanel>
    </Tabs>
  </div>
</main>
