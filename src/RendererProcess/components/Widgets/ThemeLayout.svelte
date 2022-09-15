<script>
  export let data;
  export let changeValue;
  export let selected;
</script>

<div class="theme">
  {#each data as theme, index}
    <div class="theme-color" on:click={() => changeValue(index)}>
      <div
        class="theme-img theme-{theme.name}"
        class:active={selected == theme.name}
      />
      <p>{theme.name}</p>
    </div>
  {/each}
</div>

<style lang="scss">
  .theme {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 20px;
    .theme-color {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .theme-img {
        width: 100%;
        height: 130px;
        background-color: #33333350;
        border-radius: 10px;
        border-top: 1px solid #222222;
        &.active {
          border: 4px solid var(--accent-color);
        }
        &.theme-Dark {
          background-color: #222222;
        }
        &.theme-Light {
          background-color: #eeeeee;
        }
        &.theme-Amoled {
          background-color: #000000;
        }
      }

      p {
        font-size: 14px;
        font-weight: 400;
        margin-top: 10px;
      }
    }
  }
</style>
