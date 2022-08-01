<script>
  import { location } from "svelte-spa-router";
  import { toggleSidebar } from "../../store/clickFunc";

  import { MenuBoldIcon } from "../Icons/";
  import ActionButton from "./ActionButton.svelte";
  // const formatLocation = (str) => {
  //   return str
  //     .toString()
  //     .replace(/[/]/g, "")
  //     .replace(/[-]/, " ")
  //     .replace(/\b\w/i, (c) => c.toUpperCase());
  // };
</script>

<div class="header">
  <div class="left">
    <span class="icon" on:click={() => ($toggleSidebar = !$toggleSidebar)}>
      <svelte:component this={MenuBoldIcon} />
    </span>
  </div>

  <div class="right">
    <ActionButton />
  </div>
</div>

<style lang="scss">
  .header {
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    z-index: 99;
    margin-top: 10px;
    padding: 0 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    /* border: 1px solid red; */

    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
          :global(svg) {
            :global(path) {
              fill: #ffffff;
            }
          }
        }
      }
    }
  }
</style>
