<script lang="ts">
    import {createEventDispatcher, onDestroy, onMount} from "svelte"
    import { Ports, type Port, PortsHistoryGraph } from "./Port";
    import Pin from "./Pin.svelte";
    import { Chip } from "./Chip";
    import { Scheduler } from "./Scheduler";
    export let ports:Ports=Ports.fromArray([])

    let hist:PortsHistoryGraph=new PortsHistoryGraph()
    export let chip:Chip=new Chip()
    $:portnum=chip.ports.length>>1
    export let scale=24
    let scheduler:Scheduler
    $:u=scale
    let astable=false
    let count=0
    function getColor(i:number){
        const colors="#f33,#f93,#ff3,#3f3,#3f9,#3ff,#33f,#93f,#f3f".split(",")
        return colors[i%colors.length]
    }
    const dispatch = createEventDispatcher()
    let to=0
    function portToggled(e:CustomEvent){
        if(!chip.stable){
        //     return ;//alert("chip is unstable, wait for HALT")
        }
        //console.log("pinToggled",e.detail)
        hist=hist.add(chip.ports.copy()).copy()
        chip=chip.next()

        count+=1
        if(!chip.stable){
            clearTimeout(to)
            to=setTimeout(()=>portToggled(e),1000)
            dispatch("statechanged",chip)
        }
    }
    onMount(()=>{
        console.log("created",chip.name)
        scheduler=Scheduler.create()
        chip=chip.next()
        if(!chip.stable){
            clearTimeout(to)
            to=setTimeout(()=>portToggled({detail:ports[0]} as unknown as CustomEvent),1000)
            dispatch("statechanged",chip)
        }
    })
    
    onDestroy(()=>{
        console.log("destroyed",chip.name)
        scheduler.close()
    })
</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width={16*u} height={4*(portnum+1)*u+2} viewBox="0 0 {16*u} {4*(portnum+1)*u+2}">
<g transform="scale({u})">
    <rect class="dip-package-body" x={3} y={1.5} height={2*portnum-1+1} width="5" rx="0.1" />
    {#each chip.ports as port,i}
        <Pin port={port} packageNum={portnum} on:toggle={portToggled}/>
    {/each}
    <text class="dip-text" transform="rotate(-90)" x={-7} y={5}>{chip.name.padStart(10,'_')}</text>
    <slot ports={chip.ports.copy()}></slot>
    <g transform="translate(0 {2*(portnum)+1})">
        <rect class=graph x={-1} y={1.5} width={25} height={portnum+.7}/> 
        {#each Object.entries(hist.index) as [name,histo],i}
        {#if i%portnum === i}
            <g transform="translate(.5 {i+2})" stroke={getColor(i)}>
                <text class="dip-graph-text" x={5} y={0.5}>{name.toUpperCase()}</text>
                <g transform="translate(0 0.6)">
                    <g transform="scale(1)">
                        <path class="dip-graph-path" d={histo.svgPath()}/>
                        <line class="dip-graph-axis" x1={0} y1={0} x2={7.5} y2={0}/>
                    </g>
                </g>
            </g>
        {:else}
            <g transform="translate(8.5 {(portnum)-(i%portnum)+1})" stroke={getColor(i)}>
                <text class="dip-graph-text" x={0} y={0.5}>{name.toUpperCase()}</text>
                <g transform="translate(2.5 0.6)">
                    <g transform="scale(1)">
                        <path class="dip-graph-path" d={histo.svgPath()}/>
                        <line class="dip-graph-axis" x1={-2.5} y1={0} x2={5} y2={0}/>
                    </g>
                </g>
            </g>
        {/if}
        {/each}
    </g>
</g>
</svg>

<style lang="scss">
    .graph{
        fill: #000;
    }

    .dip-card {
        /* Define the width and height for the cards */
        width: 400px;
        height: 700px;
        /* Basic styling for the cards */
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        /* Center the card content */
        display: flex;
        align-items: center;
        justify-content: center;
    }
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
    .dip-graph-path{
        stroke-width:.05;
        fill:#0000;
    }
    .dip-graph-axis{
        stroke:#333;
        stroke-width:.0125;
        fill:#0000;
    }
    .dip-graph-text{
        fill:#222222;
        stroke: #ffffff;
        stroke-width: 0.0125;
        font-size: .50px;
        font-family: 'Courier New', Courier, monospace;
    }
</style>