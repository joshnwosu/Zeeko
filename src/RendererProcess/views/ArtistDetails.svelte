<script>
  export let params = {};
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import {
    gsap,
    ScrollTrigger,
    Draggable,
    MotionPathPlugin,
    Flip,
  } from "gsap/all";
  import { onMount } from "svelte";
  let visible = true;
  let box;
  var needsRotationUpdate = false;
  var sections = 90;

  onMount(() => {
    // don't forget to register plugins
    gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin);

    var rotationSnap = 90;
    Draggable.create("#knob", {
      type: "rotation", //instead of "x,y" or "top,left", we can simply do "rotation" to make the object spinnable!
      inertia: true, //enables kinetic-based flicking (continuation of movement, decelerating after releasing the mouse/finger)
      // snap: function (endValue) {
      //   //this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
      //   return Math.round(endValue / rotationSnap) * rotationSnap;
      // },
      // throwProps: true,
      // edgeResistance: 0.85,
      // bounds: { minRotation: 0, maxRotation: 360 },
      snap: function (endValue) {
        // var step = 360 / (sections - 1);
        // return Math.round(endValue / step) * step;
        return Math.round(endValue / rotationSnap) * rotationSnap;
      },
    });

    gsap.from(box, { color: "red", duration: 1, delay: 2 });
  });

  function tweenMe(node) {
    let tl = gsap.timeline();
    const duration = 1;

    tl.from(node, {
      duration,
      opacity: 0,
    }).from(
      node,
      {
        duration,
        xPercent: 100,
        rotation: -90,
        yPercent: 100,
        ease: "bounce.out",
      },
      `-=${duration * 0.75}`
    );

    return {
      /* GSAP's duration is in seconds. Svelte's is in miliseconds */
      duration: tl.totalDuration() * 1000,
      tick: (t) => {
        tl.progress(t);
      },
    };
  }
</script>

<main class="page" transition:fade>
  <label>
    <input type="checkbox" bind:checked={visible} />
    visible
  </label>

  {#if visible}
    <div class="box" transition:tweenMe />
  {/if}

  <div bind:this={box} class="blue" />
  <h1>{params.name}</h1>

  <div id="knob">
    <div id="knob-handle" />
  </div>
</main>

<style>
  .page {
    padding-top: 50px;
  }
  .box {
    width: 100px;
    height: 100px;
    background: #ffffff;
  }
  .blue {
    width: 100px;
    height: 100px;
    color: blue;
    background-color: currentColor;
  }

  #knob {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: red;
    border-radius: 50%;
    padding: 10px;

    display: flex;
    justify-content: center;
    /* align-items: center; */
  }
  #knob-handle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: blue;
  }
</style>
