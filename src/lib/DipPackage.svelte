<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import type { Port } from "./Port";
    import Pin from "./Pin.svelte";
    import { Chip } from "./Chip";
    export let ports:Array<Port>=[]
    $:portnum=ports.length>>1
    let u=16
    const dispatch = createEventDispatcher()
    function portToggled(e:CustomEvent){
        console.log("pinToggled",e.detail)
        dispatch("statechanged",ports.map(v => v))
    }

</script>

<g transform="scale({u})">
    <rect class="dip-package-body" x={2} y={2} width={2*portnum+1} height="5" rx="0.1" />
    {#each ports as port,i}
        <Pin port={port} packageNum={portnum} on:toggle={portToggled}/>
    {/each}
</g>

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
</style>