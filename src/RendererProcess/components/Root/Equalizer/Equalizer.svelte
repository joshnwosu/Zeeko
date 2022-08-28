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

  // String formatter
  if (!String.prototype.format) {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    };
  }

  let svgLine;
  let svgLineShadow;
  let loaded;
  let sliderThumbSize = 20;
  let sliderHeight = 300;
  let svgViewBoxHeight = 100;
  let svgViewBoxThumbLimit =
    (sliderThumbSize / 2) * (svgViewBoxHeight / sliderHeight);
  let svgViewBoxGraphMax = svgViewBoxHeight - svgViewBoxThumbLimit;
  let svgViewBoxGraphMin = svgViewBoxThumbLimit;

  let ranges = {
    range1: null,
    range2: null,
    range3: null,
    range4: null,
    range5: null,
    range6: null,
    range7: null,
  };
  // Only the y values changes
  let points = {
    begin: {
      x: 10,
      y: 0,
    },
    point1: {
      x: 10,
      y: 0,
    },
    control1: {
      x: 20,
      y: 10,
    },
    control2: {
      x: 20,
      y: 0,
    },
    point2: {
      x: 30,
      y: 0,
    },
    control3: {
      x: 40,
      y: 0,
    },
    point3: {
      x: 50,
      y: 0,
    },
    control4: {
      x: 60,
      y: 0,
    },
    point4: {
      x: 70,
      y: 0,
    },
    control5: {
      x: 80,
      y: 0,
    },
    point5: {
      x: 90,
      y: 0,
    },
    control6: {
      x: 100,
      y: 0,
    },
    point6: {
      x: 110,
      y: 0,
    },
    control7: {
      x: 120,
      y: 0,
    },
    point7: {
      x: 130,
      y: 0,
    },
  };

  onMount(() => {
    // svgLine = document.querySelector("svg .line");
    // svgLineShadow = document.querySelector("svg .line-shadow");
    loaded = true;
  });

  function mapDataRange(value) {
    // stackoverflow.com/a/929107/5707008
    // return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
    return (
      ((value - 0) * (svgViewBoxGraphMax - svgViewBoxGraphMin)) /
        (svgViewBoxHeight - 0) +
      svgViewBoxGraphMin
    );
  }

  function updatePoints() {
    // Convert from percentage to coordinate values
    // Calculate and floor the values
    points.point1.y =
      (svgViewBoxHeight - (svgViewBoxHeight * ranges.range1) / 100) | 0;
    points.point2.y =
      (svgViewBoxHeight - (svgViewBoxHeight * ranges.range2) / 100) | 0;
    points.point3.y =
      (svgViewBoxHeight - (svgViewBoxHeight * ranges.range3) / 100) | 0;
    points.point4.y =
      (svgViewBoxHeight - (svgViewBoxHeight * ranges.range4) / 100) | 0;
    points.point5.y =
      (svgViewBoxHeight - (svgViewBoxHeight * ranges.range5) / 100) | 0;
    points.point6.y =
      (svgViewBoxHeight - (svgViewBoxHeight * ranges.range6) / 100) | 0;
    points.point7.y =
      (svgViewBoxHeight - (svgViewBoxHeight * ranges.range7) / 100) | 0;

    const max = svgViewBoxGraphMax;
    const min = svgViewBoxGraphMin;

    points.point1.y = mapDataRange(points.point1.y);
    points.point2.y = mapDataRange(points.point2.y);
    points.point3.y = mapDataRange(points.point3.y);
    points.point4.y = mapDataRange(points.point4.y);
    points.point5.y = mapDataRange(points.point5.y);
    points.point6.y = mapDataRange(points.point6.y);
    points.point7.y = mapDataRange(points.point7.y);

    // Update Y for the other points
    points.begin.y = points.point1.y;
    points.control1.y = points.point1.y;
    points.control2.y = points.point2.y;
    points.control3.y = points.point3.y;
    points.control4.y = points.point4.y;
    points.control5.y = points.point5.y;
    points.control6.y = points.point6.y;
    points.control7.y = points.point7.y;
  }

  function updateSlider(event) {
    updateBandFilter(event.detail);
    // console.log("Event:", event.detail, $EqualizerManager);
    renderSliderGraph();
  }

  function getInterpolationLine(type) {
    let shadowOffset = 0;
    if (type === "shadow") {
      shadowOffset = 10; // simple simulation, no fancy shadow algorithm
    }

    return "M {0},{1} L {2},{3} C {4},{5} {6},{7} {8},{9} S {10} {11}, {12} {13} S {14} {15}, {16} {17} S {18} {19}, {20} {21} S {22} {23}, {24} {25} S {26} {27}, {28} {29}".format(
      // M
      points.begin.x,
      points.begin.y,
      // L
      points.point1.x,
      points.point1.y,
      // C
      points.control1.x,
      points.control1.y,
      points.control2.x,
      points.control2.y + shadowOffset,
      points.point2.x,
      points.point2.y + shadowOffset,
      // S
      points.control3.x,
      points.control3.y,
      points.point3.x,
      points.point3.y,
      // S
      points.control4.x,
      points.control4.y + shadowOffset,
      points.point4.x,
      points.point4.y + shadowOffset,
      // S
      points.control5.x,
      points.control5.y,
      points.point5.x,
      points.point5.y,
      // S
      points.control6.x,
      points.control6.y + shadowOffset,
      points.point6.x,
      points.point6.y + shadowOffset,
      // S
      points.control7.x,
      points.control7.y,
      points.point7.x,
      points.point7.y
    );
  }

  function renderSliderGraph() {
    if (loaded) {
      updatePoints();
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
      <path d="" class="line-shadow" bind:this={svgLineShadow} />
      <path d="" class="line" bind:this={svgLine} />
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
      /* border: 1px solid red; */
      .line {
        stroke: #65e14d;
      }
      .line-shadow {
        z-index: 3;
        stroke-width: 2;
        stroke: red;
        opacity: 0.35;
      }
    }
  }
</style>
