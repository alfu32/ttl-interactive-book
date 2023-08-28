<script lang="ts">
    import { Chip } from "./lib/Chip";
    import DipPackage from "./lib/DipPackage.svelte";
    import { Port } from "./lib/Port";
    let x7400=Chip.create({
      ports:Port.createPortsFromArray("a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc".split(',')),
      name:"7400",
      description:"Quad Two Input NAND Gate",
      changestate:(crt:Array<Port>)=>{
        const [a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc]=crt
        y1.setOn(!(a1.isOn()&&b1.isOn()))
        y2.setOn(!(a2.isOn()&&b2.isOn()))
        y3.setOn(!(a3.isOn()&&b3.isOn()))
        y4.setOn(!(a4.isOn()&&b4.isOn()))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7402=Chip.create({
      ports:Port.createPortsFromArray("a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc".split(',')),
      name:"7402",
      description:"QUAD 2-INPUT NOR GATE",
      changestate:(crt:Array<Port>)=>{
        const [a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc]=crt
        y1.setOn(!(a1.isOn() || b1.isOn()))
        y2.setOn(!(a2.isOn() || b2.isOn()))
        y3.setOn(!(a3.isOn() || b3.isOn()))
        y4.setOn(!(a4.isOn() || b4.isOn()))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7404=Chip.create({
      ports:Port.createPortsFromArray("a1,y1,a2,y2,a3,y3,gnd,y4,a4,y5,a5,y6,a6,vcc".split(',')),
      name:"7404",
      description:"Hex Inverter",
      changestate:(crt:Array<Port>)=>{
        const [a1,y1,a2,y2,a3,y3,gnd,y4,a4,y5,a5,y6,a6,vcc]=crt
        y1.setOn(!a1.isOn())
        y2.setOn(!a2.isOn())
        y3.setOn(!a3.isOn())
        y4.setOn(!a4.isOn())
        y5.setOn(!a5.isOn())
        y6.setOn(!a6.isOn())
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7408=Chip.create({
      ports:Port.createPortsFromArray("a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc".split(',')),
      name:"7408",
      description:"Quad Two Input AND Gate",
      changestate:(crt:Array<Port>)=>{
        const [a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc]=crt
        y1.setOn( a1.isOn() && b1.isOn() )
        y2.setOn( a2.isOn() && b2.isOn() )
        y3.setOn( a3.isOn() && b3.isOn() )
        y4.setOn( a4.isOn() && b4.isOn() )
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7410=Chip.create({
      ports:Port.createPortsFromArray("a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc".split(',')),
      name:"7410",
      description:"Triple 3-Input NAND Gate",
      changestate:(crt:Array<Port>)=>{
        const [a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc]=crt
        y1.setOn(!(a1.isOn()&&b1.isOn()&&c1.isOn()))
        y2.setOn(!(a2.isOn()&&b2.isOn()&&c2.isOn()))
        y3.setOn(!(a3.isOn()&&b3.isOn()&&c3.isOn()))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
</script>

<main>
    <DipPackage scale={10} chip={x7400}/>
    <DipPackage scale={10} chip={x7402}/>
    <DipPackage scale={10} chip={x7404}/>
    <DipPackage scale={10} chip={x7408}/>
    <DipPackage scale={10} chip={x7410}/>
</main>

<style lang="scss">
</style>
