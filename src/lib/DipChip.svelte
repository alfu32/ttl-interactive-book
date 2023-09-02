<script lang="ts">
    import {createEventDispatcher, onDestroy, onMount, type DispatchOptions} from "svelte"
    import { Ports, type Port, PortsHistoryGraph } from "./Port";
    import Pin from "./Pin.svelte";
    import { Chip } from "./Chip";
    import { Scheduler } from "./Scheduler";
    import DipPackage from "./DipPackage.svelte";
    const dispatch = createEventDispatcher()

    let hist:PortsHistoryGraph=new PortsHistoryGraph()
    export let scale=24
    export let portList="a,b,c,d"
    export let name="chip"
    export let description="default"
    $:chip=Chip.create({
        ports:Ports.createPortsFromNames(portList.split(',')),
        name,
        description,
        changestate:(ports:Ports)=>{
            const p=ports.copy()
            const vcc=p.find(pp => pp.name.toLowerCase() === "vcc" )
            if(vcc && vcc.isOn()){
                dispatch("statechange",p,{cancelable:true} as DispatchOptions)
            } else {
                p.forEach(pp => pp.setOn(false))
            }
            return p
        },
    })
    let count=0
    onMount(()=>{
        console.log("created",chip.name)
    })
    
    onDestroy(()=>{
        console.log("destroyed",chip.name)
    })
    let to=0
    let stable=true
    function chipChanged(e:CustomEvent<Chip>){
        console.log(e.detail)
        count++
        stable=e.detail.stable
        if(!stable){
            clearTimeout(to)
            to=setTimeout(()=>{stable=true},1000)
        }
    }
</script>
<div class="dip-card">
<h3>{chip.name}</h3>
<button on:click={e=>scale-=4}>-</button>{scale}<button on:click={e=>scale+=4}>+</button>
<div>{chip.description}</div>
<div class={stable?'stable':'astable'}>{stable?'Stable_____':'Stabilizing'} (count:{count})</div>
<slot chip={chip.clone()} name="text"></slot>
<!--pre>
    stable      :{chip.stable}
    count       :{count}
    prevState   :{chip.prevState}
    curentState :{chip.curentState}
</pre-->
<DipPackage chip={chip} scale={scale} on:statechanged={chipChanged}>
    <slot ports={chip.ports.copy()} name="canvas"></slot>
</DipPackage>
</div>

<style lang="scss">

    .astable{
        opacity: 1;
        transition: opacity 0.5s ease-out;
    }
    .stable{
        opacity: 0.1;
        transition: opacity 0.5s ease-out;
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
        stroke-width:.025;
        fill:#0000;
    }
    .dip-graph-axis{
        stroke:#000;
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