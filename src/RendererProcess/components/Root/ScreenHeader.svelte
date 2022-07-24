<script>
    export let name;
    // const formatRoute  = (str) => {
    //     return str.toLowerCase().replace(/[/]/g, '').replace(/[-]/, ' ').replace(/\b\w/i, c => c.toUpperCase())
    // }
</script>

<div class="screen-header">
    <h1>{name}</h1>
</div>

<style lang="scss">
    .screen-header {
        position: sticky;
        top: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(20px);
        padding: 0 20px 20px;
        clear: both;
        /* border: 1px solid red; */
        
        h1 {
            font-size: 30px;
            font-weight: 200;
        }
    }
</style>