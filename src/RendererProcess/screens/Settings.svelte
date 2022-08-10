<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import Switch from "../components/Addon/Switch.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import { Tabs, TabList, TabPanel, Tab } from "../components/Tab";
  let checked1 = false;
  let checked2 = false;
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
        <h2>First panel</h2>
        <p>{checked1} {checked2}</p>
        <Switch
          checked={checked1}
          toggle={(e) => (checked1 = e.target.checked)}
        />
        <Switch
          checked={checked2}
          toggle={(e) => (checked2 = e.target.checked)}
        />
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
