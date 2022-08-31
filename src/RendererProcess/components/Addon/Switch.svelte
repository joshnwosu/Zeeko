<script>
  import { currentAccentColor } from "../../store/theme";

  export let checked;
  export let toggle;
</script>

<label
  class="switch"
  class:checked
  style="--accent-color: {$currentAccentColor}"
>
  <input type="checkbox" bind:checked on:input={toggle} />
  <div class="knob" />
</label>

<style lang="scss">
  .switch {
    width: 45px;
    height: 25px;
    background-color: #888888;
    border-radius: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1px;
    transition: 0.15s ease;
    &.checked {
      background-color: var(--accent-color);
      .knob {
        transform: translateX(calc(45px - 23px));
        box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.2);
      }
    }
    input[type="checkbox"] {
      display: none;
    }
    .knob {
      width: 23px;
      height: 23px;
      background-color: #ffffff;
      border-radius: 50%;
      transition: 0.2s ease;
    }
  }
</style>
