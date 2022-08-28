<script>
  import { toggleEqualizer } from "../../../store/status";
  import { EqualizerManager } from "../../../store/player";
  import FilterSlider from "./FilterSlider.svelte";
  import {
    updateBandFilter,
    loadPreset,
    changeBandGains,
  } from "../../../store/playerManager";
  import { onMount } from "svelte";

  let svgLine;
  let svgLineShadow;
  let loaded;

  onMount(() => {
    svgLine = document.querySelector("svg .line");
    svgLineShadow = document.querySelector("svg .line-shadow");
    loaded = true;
  });

  function updateSlider(event) {
    updateBandFilter(event.detail);
    console.log("Event:", event.detail, $EqualizerManager);
    // renderSliderGraph();
  }

  function getInterpolationLine(type) {
    let shadowOffset = 0;
    if (type === "shadow") {
      shadowOffset = 10;
    }

    return "M {0},{1} L {2},{3} C {4},{5} {6},{7} {8},{9} S {10} {11}, {12} {13} S {14} {15}, {16} {17} S {18} {19}, {20} {21} S {22} {23}, {24} {25} S {26} {27}, {28} {29}";
    //   // M
    //   points.begin.x,
    //   points.begin.y,
    //   // L
    //   points.point1.x,
    //   points.point1.y,
    //   // C
    //   points.control1.x,
    //   points.control1.y,
    //   points.control2.x,
    //   points.control2.y + shadowOffset,
    //   points.point2.x,
    //   points.point2.y + shadowOffset,
    //   // S
    //   points.control3.x,
    //   points.control3.y,
    //   points.point3.x,
    //   points.point3.y,
    //   // S
    //   points.control4.x,
    //   points.control4.y + shadowOffset,
    //   points.point4.x,
    //   points.point4.y + shadowOffset,
    //   // S
    //   points.control5.x,
    //   points.control5.y,
    //   points.point5.x,
    //   points.point5.y,
    //   // S
    //   points.control6.x,
    //   points.control6.y + shadowOffset,
    //   points.point6.x,
    //   points.point6.y + shadowOffset,
    //   // S
    //   points.control7.x,
    //   points.control7.y,
    //   points.point7.x,
    //   points.point7.y
    // );
  }

  function renderSliderGraph() {
    if (loaded) {
      svgLine.setAttribute("d", getInterpolationLine());
      svgLineShadow.setAttribute("d", getInterpolationLine("shadow"));
    }
  }
</script>

<div class="equalizer" class:open={$toggleEqualizer}>
  <h1>Equalizer</h1>
  <div class="presets">
    {#each $EqualizerManager.equalizerPresets as preset}
      <button
        on:click={() => loadPreset(preset)}
        class:active={$EqualizerManager.currentPreset == preset.name}
        >{preset.name}</button
      >
    {/each}
  </div>

  <div class="filter_sliders">
    <svg preserveAspectRatio="none" viewBox="0 0 140 100">
      <path d="" class="line-shadow" />
      <path d="" class="line" />
    </svg>
    {#each $EqualizerManager.bands as band, index}
      <div class="filter">
        <p>{band.value}db</p>
        <svelte:component
          this={FilterSlider}
          bandIndex={index}
          filterValue={band.value}
          on:rangeUpdated={updateSlider}
        />
        <p>{band.frequency}</p>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .equalizer {
    height: calc(100% - 100px);
    position: fixed;
    right: 60px;
    top: 0;
    bottom: 0;
    background-color: #00000080;
    z-index: 99;
    backdrop-filter: blur(20px);
    transform: translateY(20%);
    transition: 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
    padding: 50px;
    opacity: 0;
    visibility: hidden;
    box-sizing: border-box;
    &.open {
      transform: translateY(0%);
      opacity: 1;
      visibility: visible;
    }
  }

  .presets {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    button {
      border: none;
      background-color: #ffffff20;
      color: #ffffff;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 12px;
      &.active,
      &:hover {
        background-color: #65e14d;
        color: #000000;
      }
    }
  }

  .filter_sliders {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    position: relative;
    .filter {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      p {
        width: 50px;
        font-size: 12px;
        border: 1px solid #ffffff05;
        text-align: center;
      }
    }

    svg {
      z-index: 3;
      overflow: hidden;
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      fill: none;
      stroke-width: 1;
      border: 1px solid red;
      .line {
        stroke: #65e14d;
      }
      .line-shadow {
        z-index: 3;
        stroke-width: 2;
        stroke: #252525;
        opacity: 0.35;
      }
    }
  }
</style>
