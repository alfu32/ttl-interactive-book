<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte"
    import type { Port } from "./Port";
    import Pin from "./Pin.svelte";
    import { Chip } from "./Chip";
    export let ports:Array<Port>=[]
    export let chip:Chip=new Chip()
    $:portnum=chip.ports.length>>1
    export let scale=16
    $:u=scale
    let astable=false
    let count=0
    const dispatch = createEventDispatcher()
    function portToggled(e:CustomEvent){
        if(!chip.stable){
        //     return ;//alert("chip is unstable, wait for HALT")
        }
        console.log("pinToggled",e.detail)
        chip=chip.next()
        count+=1
        if(!chip.stable){
            setTimeout(()=>portToggled(e),1000)
            dispatch("statechanged",chip)
        }
    }
    onMount(()=>{
        chip=chip.next()
        if(!chip.stable){
            setTimeout(()=>portToggled({detail:ports[0]} as unknown as CustomEvent),1000)
            dispatch("statechanged",chip)
        }
    })
</script>
<div class="dip-card">
<h3>{chip.name}</h3>
<div>{chip.description}</div>
<!--pre>
    stable      :{chip.stable}
    count       :{count}
    prevState   :{chip.prevState}
    curentState :{chip.curentState}
</pre-->
<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width={16*u} height={2*(portnum+2)*u} viewBox="0 0 {16*u} {2*(portnum+2)*u}">
<g transform="scale({u})">
    <rect class="dip-package-body" x={3} y={1.5} height={2*portnum-1+1} width="5" rx="0.1" />
    {#if !chip.stable}
    <rect class="dip-package-body" x={12} y={0} width={1} height={1}/>
    <text class="dip-text" x={0} y={0}>{count}</text>
    {/if}
    {#each chip.ports as port,i}
        <Pin port={port} packageNum={portnum} on:toggle={portToggled}/>
    {/each}
    <text class="dip-text" transform="rotate(-90)" x={-7} y={5}>{chip.name.padStart(10,'_')}</text>
    <slot></slot>
</g>
</svg>
</div>

<style lang="scss">
    .dip-card{
        display:inline-block;
        box-sizing: border-box;
        border: 1px solid #999;
        margin:5px;
        padding:5px;
        border-radius: 5px;
        box-shadow: 0px 0px 12px #3333;

    }
    .dip-package-body{
        fill:#fff;
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