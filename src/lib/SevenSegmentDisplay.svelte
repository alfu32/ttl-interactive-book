<script lang="ts">
    import {createEventDispatcher, onDestroy, onMount} from "svelte"
    import { Ports, type Port, PortsHistoryGraph } from "./Port";
    import Pin from "./Pin.svelte";
    import { Chip } from "./Chip";
    import { Scheduler } from "./Scheduler";
    export let digit=0
    export let x=0
    export let y=0
    let pad=.35
    $:vals={
        a:([0,2,3,5,6,7,8,9,10,12,14,15].indexOf(digit%16)>-1)?"on":"off",
        b:([0,1,2,3,4,7,8,9,10,13].indexOf(digit%16)>-1)?"on":"off",
        c:([0,1,3,4,5,6,7,8,9,10,11,13].indexOf(digit%16)>-1)?"on":"off",
        d:([0,2,3,5,6,8,9,11,12,13,14].indexOf(digit%16)>-1)?"on":"off",
        e:([0,2,6,8,10,11,12,13,14,15].indexOf(digit%16)>-1)?"on":"off",
        f:([0,4,5,6,8,9,10,11,12,14,15].indexOf(digit%16)>-1)?"on":"off",
        g:([2,3,4,5,6,8,9,10,11,13,14,15].indexOf(digit%16)>-1)?"on":"off",
        dot:(digit>15)?"on":"off",
    }
    onMount(()=>{
    })
    
    onDestroy(()=>{
        console.log("destroyed")
    })
</script>


<g transform="translate({x},{y})">
<line class="seven-seg-display {vals.a}" id="a" x1={1+pad} y1={1} x2={3-pad} y2={1}/>
<line class="seven-seg-display {vals.b}" id="b" x1={3} y1={1+pad} x2={3} y2={3-pad}/>
<line class="seven-seg-display {vals.c}" id="c" x1={3} y1={3+pad} x2={3} y2={5-pad}/>
<line class="seven-seg-display {vals.d}" id="d" x1={1+pad} y1={5} x2={3-pad} y2={5}/>
<line class="seven-seg-display {vals.e}" id="e" x1={1} y1={3+pad} x2={1} y2={5-pad}/>
<line class="seven-seg-display {vals.f}" id="f" x1={1} y1={1+pad} x2={1} y2={3-pad}/>
<line class="seven-seg-display {vals.g}" id="g" x1={1+pad} y1={3} x2={3-pad} y2={3}/>
<line class="seven-seg-carry {vals.dot}" id="dot" x1={3+pad} y1={5} x2={3+pad} y2={5}/>
</g>
<style lang="scss">

  .seven-seg-display,.seven-seg-carry{
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