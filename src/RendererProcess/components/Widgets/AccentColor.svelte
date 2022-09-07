<script>
  export let accentColorsConfig;
  export let changeAccentColor;
  import { currentAccentColor } from "../../store/theme";
</script>

<div class="color">
  <div class="color-label">Accents</div>
  <div class="accent-colors">
    {#each accentColorsConfig as color, index}
      <div class="accent-color" on:click={() => changeAccentColor(index)}>
        <span class="ring" class:active={$currentAccentColor == color} />
        <span style="background-color: {color}" class="shade" />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .color {
    border: 1px solid #12121250;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .color-label {
      font-size: 16px;
      font-weight: 400;
    }
    .accent-colors {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .accent-color {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: relative;
        /* margin-right: 10px; */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        z-index: 0;
      }

      .ring {
        width: 50px;
        height: 50px;
        border: 3px solid transparent;
        border-radius: 50%;
        transition: all 200ms linear;
        position: absolute;
        transform: scale(0);
        &.active {
          border-color: var(--accent-color);
          transform: scale(1);
        }
      }
      .shade {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
