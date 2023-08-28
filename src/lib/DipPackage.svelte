<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte"
    import type { Port } from "./Port";
    import Pin from "./Pin.svelte";
    import { Chip } from "./Chip";
    export let ports:Array<Port>=[]
    export let chip:Chip=new Chip()
    $:portnum=chip.ports.length>>1
    let u=16
    const dispatch = createEventDispatcher()
    function portToggled(e:CustomEvent){
        console.log("pinToggled",e.detail)
        chip=chip.clone()
        chip.ports=chip.changestate(chip.ports)
        dispatch("statechanged",chip)
    }
    onMount(()=>{
        chip.ports=chip.changestate(chip.ports)
        dispatch("statechanged",chip)
    })
</script>

<h3>{chip.name}</h3>
<div>{chip.description}</div>
<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="640" height="256" viewBox="0 0 640 256">
<g transform="scale({u})">
    <rect class="dip-package-body" x={3} y={1.5} height={2*portnum-1+1} width="5" rx="0.1" />
    {#each chip.ports as port,i}
        <Pin port={port} packageNum={portnum} on:toggle={portToggled}/>
    {/each}
    <text class="dip-text" transform="rotate(-90)" x={-7} y={5}>{chip.name.padStart(10,'_')}</text>
</g>
</svg>

<style lang="scss">
    .dip-package-body{
        fill:#FFFF55;
        stroke: #333333;
        stroke-width: 0.125;
    }
    .dip-pin{
        fill:#FFFF55;
        stroke: #333333;
        stroke-width: 0.125;
    }
    .dip-text{
        fill:#222222;
        stroke: #ffffff;
        stroke-width: 0.0125;
        font-size: .85px;
        font-family: 'Courier New', Courier, monospace;
    }
</style>