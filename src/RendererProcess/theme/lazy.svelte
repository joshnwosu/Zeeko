<!-- For anyone that's super lazy and just wants to get CSS variables working quickly like me: -->
<script>
  export let themeSettings = {
    font: {
      family: "Merriweather, serif",
    },
    main: {
      background: "white",
    },
    colors: {
      primary: { background: "#1b4738", color: "white" },
    },
  };

  function encodeB64(str) {
    if (process.browser) {
      // For Sapper
      return btoa(str);
    } else {
      const buff = Buffer.from(str, "utf-8");
      return buff.toString("base64");
    }
  }

  function makeCSSVars(settings, prefix = "-") {
    return Object.entries(settings)
      .flatMap(([key, value]) => {
        const path = prefix + "-" + key;
        if (typeof value === "object") return makeCSSVars(value, path);
        else return `${path}:${value};`;
      })
      .join("\n");
  }

  $: themeCSS = `:root {${makeCSSVars(themeSettings)}}`;
</script>

<link rel="stylesheet" href="data:text/css;base64,{encodeB64(themeCSS)}" />

<style>
  /* main {
  background: var(--colors-primary-background);
} */
</style>
