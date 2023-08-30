<script lang="ts">
    import {createEventDispatcher, onDestroy, onMount} from "svelte"
    import { Ports, type Port, PortsHistoryGraph } from "./Port";
    import Pin from "./Pin.svelte";
    import { Chip } from "./Chip";
    import { Scheduler } from "./Scheduler";
    export let digit=0
    export let bits=8
    export let x=0
    export let y=0
    export let height=5
    let pad=.35
    $:vals={
        d0:((digit&1) === 0)?"off":"on",
        d1:((digit&2) === 0)?"off":"on",
        d2:((digit&4) === 0)?"off":"on",
        d3:((digit&8) === 0)?"off":"on",
        d4:((digit&16) === 0)?"off":"on",
        d5:((digit&32) === 0)?"off":"on",
        d6:((digit&64) === 0)?"off":"on",
        d7:((digit&128) === 0)?"off":"on",
        dot:(digit>255)?"on":"off",
    }
    onMount(()=>{
    })
    
    onDestroy(()=>{
        console.log("destroyed")
    })
</script>


<g transform="translate({x+bits*0.2},{y})">
    {#each new Array(bits).fill(0) as v,i}
    <line class="seven-seg-display {((digit&Math.pow(2,i)) === 0)?"off":"on"}" id="d0" x1={bits-i*1.2-1} y1={0} x2={bits-i*1.2-1} y2={-height}/>
    {/each}
    <line class="seven-seg-carry {(digit>(Math.pow(2,bits)-1))?"on":"off"}" id="dot" x1={bits+.5} y1={0} x2={bits+.5} y2={0}/>
</g>
<style lang="scss">

  .seven-seg-display{
    stroke-width: .99;
    stroke: #fee;
    stroke-linecap: round;
  }
  .seven-seg-carry{
    stroke-width: .35;
    stroke: #fee;
    stroke-linecap: round;
  }
  .seven-seg-display.on{
    stroke: #2c2;
  }
  .seven-seg-display.off{
    stroke: #2a22;
  }
  .seven-seg-carry.on{
    stroke: #e22;
  }
  .seven-seg-carry.off{
    stroke: #d222;
  }
</style>