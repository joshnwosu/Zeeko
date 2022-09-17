<script>
  import Appearance from "../components/Layouts/Appearance.svelte";
  import General from "../components/Layouts/General.svelte";
  import Shortcuts from "../components/Layouts/Shortcuts.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import ScreenView from "../components/Root/ScreenView.svelte";
  import { Tabs, TabList, TabPanel, Tab } from "../components/Tab";
</script>

<main class="page">
  <ScreenHeader title="Settings" />
  <ScreenView>
    <Tabs>
      <TabList>
        <div class="tab-list">
          <Tab>General</Tab>
          <Tab>Appearance</Tab>
          <Tab>Shortcuts</Tab>
          <Tab>Notifications</Tab>
          <Tab>Updates</Tab>
          <Tab>About</Tab>
        </div>
      </TabList>

      <TabPanel>
        <div class="tab-panel">
          <General />
        </div>
      </TabPanel>

      <TabPanel>
        <div class="tab-panel">
          <Appearance />
        </div>
      </TabPanel>

      <TabPanel>
        <div class="tab-panel">
          <Shortcuts />
        </div>
      </TabPanel>

      <TabPanel>
        <h2>Forth panel</h2>
      </TabPanel>

      <TabPanel>
        <h2>Fifth panel</h2>
      </TabPanel>

      <TabPanel>
        <h2>Sixth panel</h2>
      </TabPanel>
    </Tabs>
  </ScreenView>
</main>

<style lang="scss">
  .page {
    &::-webkit-scrollbar-track-piece:start {
      margin-top: 150px;
    }
  }
  .tab-list {
    border-bottom: 1px solid #222222;
    position: sticky;
    top: 100px;
    background-color: #000000;
    z-index: 2;
  }

  .tab-panel {
    width: 700px;
    padding-top: 20px;
    /* padding-bottom: 100px; */
  }
</style>
