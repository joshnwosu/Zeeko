<script>
  import { createEventDispatcher } from "svelte";
  import { currentAccentColor } from "../../../store/theme";
  const dispatch = createEventDispatcher();
  export let bandIndex;
  export let filterValue;

  $: newFilterValue = 15;
  let progressBarHeight;

  function updateInput(e) {
    newFilterValue = parseInt(e.srcElement.value);
    dispatch("rangeUpdated", {
      targetBandIndex: bandIndex,
      newValue: newFilterValue * -1,
    });
  }

  $: if (newFilterValue) {
    let absoluteValue = 15;
    absoluteValue = 15 + filterValue;
    progressBarHeight = `${Math.trunc((absoluteValue / 30) * 100)}%`;
  }
</script>

<div class="base_slider" style="--background-color: {$currentAccentColor}">
  <input on:input={updateInput} value="0" min="-15" max="15" type="range" />
  <div class="base_slider_progress" style="height: {progressBarHeight};">
    <div class="knob" />
  </div>
</div>

<style lang="scss">
  .base_slider {
    position: relative;
    width: 3px;
    height: 300px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 0 auto;
    input {
      cursor: pointer;
      -webkit-appearance: none;
      opacity: 0;
      position: absolute;
      z-index: 2;
      left: 50%;
      height: 4px;
      width: 290px;
      background: none;
      transform-origin: left center;
      transform: rotate(90deg);
    }

    .base_slider_progress {
      position: absolute;
      bottom: 0px;
      left: 0px;
      height: 50%;
      background: var(--background-color);
      width: 100%;
      /* transition: height 200ms linear; */
      display: flex;
      justify-content: center;
      align-items: flex-start;
      .knob {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #ffffff;
        position: absolute;
        margin-top: -9px;
      }
    }
  }
</style>
