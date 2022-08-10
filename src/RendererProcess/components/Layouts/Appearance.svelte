<script>
  import Switch from "../Addon/Switch.svelte";
  let checked1 = false;
  let checked2 = false;
</script>

<div>
  <div>
    <h1>Music on this PC</h1>
  </div>

  <h2>First panel</h2>
  <p>{checked1} {checked2}</p>
  <Switch checked={checked1} toggle={(e) => (checked1 = e.target.checked)} />
  <Switch checked={checked2} toggle={(e) => (checked2 = e.target.checked)} />
</div>
