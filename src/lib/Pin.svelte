<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import { Port, PortHistoryGraph } from "./Port";
    export let port:Port=new Port(-1)
    export let packageNum=4
    $:isLeft=port.num<=packageNum
    $:y=isLeft?port.num:(packageNum-port.num)+packageNum+1
    $:x=isLeft?1:7
    $:yn=isLeft?.55:.55
    $:xn=isLeft?1.15:(port.num<10?-.5:-1.15)
    $:yt=isLeft?.55:0.55
    $:xt=isLeft?-1.25:1.25
    $:cy=.2
    $:cx=isLeft?.75:.25
    const dispatch = createEventDispatcher()
    function portClicked(e:MouseEvent){
        port.voltage=port.voltage?0:5
        dispatch("toggle",port)
    }

</script>
<g transform='translate({x+1} {2*y})'>
<rect class="dip-pin-rect" x={0} y={0} width={1} height={1} on:click={portClicked}/>
<circle cx={cx} cy={cy} class={port.voltage>0?"dip-pin-on":"dip-pin-off"} r={.2}/>
<text class="dip-pin-text" x={xn} y={yn}>{port.num}</text>
<text class="dip-pin-label" x={xt} y={yt}>{port.name.toUpperCase().padStart(3,'_')}</text>
</g>
<style lang="scss">
    .dip-pin-rect{
        fill:#ffffff;
        stroke: #222222;
        stroke-width: 0.125;
        cursor:pointer;
    }
    .dip-pin-rect:hover{
        fill:#ddffff;
        stroke: #555555;
        stroke-width: 0.125;
    }
    .dip-pin-text{
        fill:#222222;
        stroke: #ffffff;
        stroke-width: 0.0125;
        font-size: .55px;
        font-family: 'Courier New', Courier, monospace;
    }
    .dip-pin-label{
        fill:#222222;
        stroke: #ffffff;
        stroke-width: 0.0125;
        font-size: .55px;
        font-family: 'Courier New', Courier, monospace;
    }

    .dip-pin-off{
        fill:#00000000;
        stroke: #222222;
        stroke-width: 0.0625;
    }
    .dip-pin-on{
        fill:#FF0000;
        stroke: #cc0000;
        stroke-width: 0.0625;
    }
</style>