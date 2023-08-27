<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import { Port } from "./Port";
    export let port:Port=new Port(-1)
    export let packageNum=4
    $:isLeft=port.num<=packageNum
    $:x=isLeft?port.num:(packageNum-port.num)+packageNum+1
    $:y=isLeft?7:1
    $:xt=isLeft?0.25:(port.num<10?-1.7:-2.1)
    $:yt=isLeft?.85:.85
    const dispatch = createEventDispatcher()
    function portClicked(e:MouseEvent){
        port.voltage=port.voltage?0:4.8
        dispatch("toggle",port)
    }

</script>
<g transform='translate({1+2*x} {y})'>
<rect class={port.voltage>0?"dip-pin-on":"dip-pin-off"} x={0} y={0} width={1} height={1} on:click={portClicked}/>
<text class="dip-pin-text" x={xt} y={yt} transform='rotate(-90)'>{port.num}</text>
</g>
<style lang="scss">
    .dip-pin-text{
        fill:#222222;
        stroke: #ffffff;
        stroke-width: 0.0125;
        font-size: .75px;
        font-family: 'Courier New', Courier, monospace;
    }

    .dip-pin-off{
        fill:#003300;
        stroke: #333333;
        stroke-width: 0.125;
    }
    .dip-pin-on{
        fill:#FF0000;
        stroke: #333333;
        stroke-width: 0.125;
    }
</style>