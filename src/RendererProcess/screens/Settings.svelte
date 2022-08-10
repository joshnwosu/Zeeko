<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import General from "../components/Layouts/General.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import { Tabs, TabList, TabPanel, Tab } from "../components/Tab";
</script>

<main class="page" transition:fade>
  <ScreenHeader title="Settings" />
  <div class="screen-view">
    <Tabs>
      <TabList>
        <Tab>General</Tab>
        <Tab>Themes</Tab>
        <Tab>Shortcuts</Tab>
        <Tab>Notifications</Tab>
        <Tab>Updates</Tab>
        <Tab>About</Tab>
      </TabList>

      <TabPanel>
        <General />
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

      <TabPanel>
        <h2>Fifth panel</h2>
      </TabPanel>
    </Tabs>
  </div>
</main>
