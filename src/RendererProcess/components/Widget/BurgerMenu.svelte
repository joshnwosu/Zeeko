<div class="burger-menu">
    <span></span>
    <span></span>
    <span></span>
</div>

<style>
    .burger-menu {
        width: 25px;
        /* height: 20px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        
    }

    .burger-menu span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: #FFFFFF;
        margin: 2px 0;
  
    }

    .burger-menu span:nth-child(2) {
        width: 50%;        
    }
</style>