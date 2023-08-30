<script lang="ts">
    import { Chip } from "./lib/Chip";
    import DipPackage from "./lib/DipPackage.svelte";
    import { Port, Ports } from "./lib/Port";
    let dingDong=Chip.create({
      ports:Ports.createPortsFromNames("aa,na,gnd,bb,nb,vcc".split(',')),
      name:"74999",
      description:"Ding Dong",
      changestate:(crt:Ports)=>{
        const [aa,na,gnd,bb,nb,vcc]=crt
        if(vcc.isOn()){
          aa.setOn(!aa.isOn())
          na.setOn(!aa.isOn())
          bb.setOn(!bb.isOn())
          nb.setOn(!bb.isOn())
          gnd.setOn(false)
          // vcc.setOn(true)
        } else {
          crt.forEach(p => p.setOn(false))
        }
        return crt
      }
    })
    let x7400=Chip.create({
      ports:Ports.createPortsFromNames("a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc".split(',')),
      name:"7400",
      description:"Quad Two Input NAND Gate",
      changestate:(crt:Ports)=>{
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
      ports:Ports.createPortsFromNames("a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc".split(',')),
      name:"7402",
      description:"QUAD 2-INPUT NOR GATE",
      changestate:(crt:Ports)=>{
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
      ports:Ports.createPortsFromNames("a1,y1,a2,y2,a3,y3,gnd,y4,a4,y5,a5,y6,a6,vcc".split(',')),
      name:"7404",
      description:"Hex Inverter",
      changestate:(crt:Ports)=>{
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
      ports:Ports.createPortsFromNames("a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc".split(',')),
      name:"7408",
      description:"Quad Two Input AND Gate",
      changestate:(crt:Ports)=>{
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
      ports:Ports.createPortsFromNames("a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc".split(',')),
      name:"7410",
      description:"Triple 3-Input NAND Gate",
      changestate:(crt:Ports)=>{
        const [a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc]=crt
        y1.setOn(!(a1.isOn()&&b1.isOn()&&c1.isOn()))
        y2.setOn(!(a2.isOn()&&b2.isOn()&&c2.isOn()))
        y3.setOn(!(a3.isOn()&&b3.isOn()&&c3.isOn()))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7412=Chip.create({
      ports:Ports.createPortsFromNames("a1,b1,clr1,nq1,q2,cx2,rx2,gnd,a2,b2,cl2,nq2,q1,cx1,rx1,vcc".split(',')),
      name:"7412",
      description:"Dual Retriggerable Monostable Multivibrators",
      changestate:(crt:Ports)=>{
        const [a1,b1,clr1,nq1,q2,cx2,rx2,gnd,a2,b2,cl2,nq2,q1,cx1,rx1,vcc]=crt
        // y1.setOn(!(a1.isOn()&&b1.isOn()&&c1.isOn()))
        // y2.setOn(!(a2.isOn()&&b2.isOn()&&c2.isOn()))
        // y3.setOn(!(a3.isOn()&&b3.isOn()&&c3.isOn()))
        nq1.setOn(!q1.isOn())
        nq2.setOn(!q2.isOn())
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    }).config(function(self:Chip){
      const [a1,b1,clr1,nq1,q2,cx2,rx2,gnd,a2,b2,cl2,nq2,q1,cx1,rx1,vcc]=self.ports
    })
    let x7413=Chip.create({
      ports:Ports.createPortsFromNames("a1,y1,a2,y2,a3,y3,gnd,y4,a4,y5,a5,y6,a6,vcc".split(',')),
      name:"7413",
      description:"SCHMITT TRIGGERS DUAL GATE/HEX INVERTER",
      changestate:(crt:Ports)=>{
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
    let x7415=Chip.create({
      ports:Ports.createPortsFromNames("a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc".split(',')),
      name:"7415",
      description:"TRIPLE 3-INPUT AND GATE",
      changestate:(crt:Ports)=>{
        const [a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc]=crt
        y1.setOn(a1.isOn()&&b1.isOn()&&c1.isOn())
        y2.setOn(a2.isOn()&&b2.isOn()&&c2.isOn())
        y3.setOn(a3.isOn()&&b3.isOn()&&c3.isOn())
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7420=Chip.create({
      ports:Ports.createPortsFromNames("a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc".split(',')),
      name:"7420",
      description:"Dual 4 input NAND Gate",
      changestate:(crt:Ports)=>{
        const [a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc]=crt
        y1.setOn(!(a1.isOn()&&b1.isOn()&&c1.isOn()&&d1.isOn()))
        y2.setOn(!(a2.isOn()&&b2.isOn()&&c2.isOn()&&d2.isOn()))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7421=Chip.create({
      ports:Ports.createPortsFromNames("a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc".split(',')),
      name:"7421",
      description:"Dual 4 input AND Gate",
      changestate:(crt:Ports)=>{
        const [a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc]=crt
        y1.setOn((a1.isOn()&&b1.isOn()&&c1.isOn()&&d1.isOn()))
        y2.setOn((a2.isOn()&&b2.isOn()&&c2.isOn()&&d2.isOn()))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7425=Chip.create({
      ports:Ports.createPortsFromNames("a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc".split(',')),
      name:"7425",
      description:"Dual 4 input NOR Gate",
      changestate:(crt:Ports)=>{
        const [a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc]=crt
        y1.setOn(!(a1.isOn()||b1.isOn()||c1.isOn()||d1.isOn()))
        y2.setOn(!(a2.isOn()||b2.isOn()||c2.isOn()||d2.isOn()))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7447Ports=Ports.createPortsFromNames("a,b,c,d,e,f,g,d1,d2,d3,d4".split(','))
    let x7447Value=0
    let x7447=Chip.create({
      ports:Ports.createPortsFromNames("d2,d3,lt,nbi,nbo,d4,d1,gnd,e,d,c,b,a,g,f,vcc".split(',')),
      name:"7447",
      description:"BCD-to-Seven-Segment Decoders",
      changestate:(crt:Ports)=>{
        const [d2,d3,lt,nbi,nbo,d4,d1,gnd,e,d,c,b,a,g,f,vcc]=crt
        const num= (d1.isOn()?1:0) + (d2.isOn()?2:0)+ (d3.isOn()?4:0) + (d4.isOn()?8:0)
        a.setOn([0,2,3,5,6,7,8,9,10,12,14,15].indexOf(num)>-1)
        b.setOn([0,1,2,3,4,7,8,9,10,13].indexOf(num)>-1)
        c.setOn([0,1,3,4,5,6,7,8,9,10,11,13].indexOf(num)>-1)
        d.setOn([0,2,3,5,6,8,9,11,12,13,14].indexOf(num)>-1)
        e.setOn([0,2,6,8,10,11,12,13,14,15].indexOf(num)>-1)
        f.setOn([0,4,5,6,8,9,10,11,12,14,15].indexOf(num)>-1)
        g.setOn([2,3,4,5,6,8,9,10,11,13,14,15].indexOf(num)>-1)
        x7447Ports=[crt[12],crt[11],crt[10],crt[9],crt[8],crt[14],crt[13]]
        x7447Value=num
        console.log("bcd decoder",num)
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7469_data={
      a:0,
      b:0,
    }
    let x7469=Chip.create({
      ports:Ports.createPortsFromNames("clka1,qb1,qd1,nclr1,qc2,nc,qa2,gnd,clk2,qb2,nclr2,qd2,qc1,qa1,clkb1,vcc".split(',')),
      name:"7469",
      description:"DUAL 4-BIT DECADE OR BINARY COUNTERS",
      changestate:(crt:Ports)=>{
        const [clka1,qb1,qd1,nclr1,qc2,nc,qa2,gnd,clk2,qb2,nclr2,qd2,qc1,qa1,clkb1,vcc]=crt
        clka1.setOn(!clka1.isOn())
        clkb1.setOn(!clkb1.isOn())
        let a=(x7469_data.a+1)%16
        let b=(x7469_data.b+1)%16
        a=nclr1.isOn()?a:0
        b=nclr2.isOn()?b:0
        x7469_data={a,b}
        qa1.setOn((a&1)==1)
        qb1.setOn((a&2)==2)
        qc1.setOn((a&4)==4)
        qd1.setOn((a&8)==8)
        qa2.setOn((b&1)==1)
        qb2.setOn((b&2)==2)
        qc2.setOn((b&4)==4)
        qd2.setOn((b&8)==8)
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7483=Chip.create({
      ports:Ports.createPortsFromNames("a4,s3,a3,b3,vcc,s2,b2,a2,s1,a1,b1,gnd,c0,c4,s4,b4".split(',')),
      name:"7483",
      description:"4-BIT BINARY FULL ADDERS WITH FAST CARRY",
      changestate:(crt:Ports)=>{
        const [a4,s3,a3,b3,vcc,s2,b2,a2,s1,a1,b1,gnd,c0,c4,s4,b4]=crt
        let a=a4.asNum()*8+a3.asNum()*4+a2.asNum()*2+a1.asNum()*1
        let b=b4.asNum()*8+b3.asNum()*4+b2.asNum()*2+b1.asNum()*1
        let s=a+b+c0.asNum()
        s1.setOn((s&1)==1)
        s2.setOn((s&2)==2)
        s3.setOn((s&4)==4)
        s4.setOn((s&8)==8)
        c4.setOn(s>15)
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7485_data={
      a:0,
      b:0,
    }
    let x7485=Chip.create({
      ports:Ports.createPortsFromNames("b3,agti,aeqi,alti,agto,aeqo,alto,gnd,b0,a0,b1,a1,b2,a2,a3,vcc".split(',')),
      name:"7485",
      description:"4-BIT MAGNITUDE COMPARATOR",
      changestate:(crt:Ports)=>{
        const [b3,agti,aeqi,alti,agto,aeqo,alto,gnd,b0,a0,b1,a1,b2,a2,a3,vcc]=crt
        let a=a3.asNum()*8+a2.asNum()*4+a1.asNum()*2+a0.asNum()*1
        let b=b3.asNum()*8+b2.asNum()*4+b1.asNum()*2+b0.asNum()*1
        x7485_data={a,b}
        agto.setOn(agti.isOn()&&(a>b))
        aeqo.setOn(aeqi.isOn()&&(a===b))
        alto.setOn(alti.isOn()&&(a<b))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
</script>

<main class="dip-card-container">
    <DipPackage scale={20} chip={dingDong}/>
    <DipPackage scale={20} chip={x7400}/>
    <DipPackage scale={20} chip={x7402}/>
    <DipPackage scale={20} chip={x7404}/>
    <DipPackage scale={20} chip={x7408}/>
    <DipPackage scale={20} chip={x7410}/>
    <DipPackage scale={20} chip={x7412}/>
    <DipPackage scale={20} chip={x7413}/>
    <DipPackage scale={20} chip={x7415}/>
    <DipPackage scale={20} chip={x7420}/>
    <DipPackage scale={20} chip={x7421}/>
    <DipPackage scale={20} chip={x7425}/>
    <DipPackage scale={20} chip={x7447}>
      <g transform="translate(3,7)">
      <line class="seven-seg-display {x7447Ports[0].isOn()?'on':'off'}" id="a" x1={1} y1={1} x2={3} y2={1}/>
      <line class="seven-seg-display {x7447Ports[1].isOn()?'on':'off'}" id="b" x1={3} y1={1} x2={3} y2={3}/>
      <line class="seven-seg-display {x7447Ports[2].isOn()?'on':'off'}" id="c" x1={3} y1={3} x2={3} y2={5}/>
      <line class="seven-seg-display {x7447Ports[3].isOn()?'on':'off'}" id="d" x1={1} y1={5} x2={3} y2={5}/>
      <line class="seven-seg-display {x7447Ports[4].isOn()?'on':'off'}" id="e" x1={1} y1={3} x2={1} y2={5}/>
      <line class="seven-seg-display {x7447Ports[5].isOn()?'on':'off'}" id="f" x1={1} y1={1} x2={1} y2={3}/>
      <line class="seven-seg-display {x7447Ports[6].isOn()?'on':'off'}" id="g" x1={1} y1={3} x2={3} y2={3}/>
      <text class="seven-seg-display-txt" x={.75} y={6.5}>{x7447Value.toString(16)}</text>
      </g>
    </DipPackage>
    <DipPackage scale={20} chip={x7469}>
      <g transform="translate(3,7)">
        <text class="seven-seg-display-txt" x={8.75} y={-4.5}>CNT1:{x7469_data.a.toString(16)}</text>
        <text class="seven-seg-display-txt" x={8.75} y={-3.5}>CNT2:{x7469_data.b.toString(16)}</text>
      </g>
    </DipPackage>
    <DipPackage scale={20} chip={x7483}/>
    <DipPackage scale={20} chip={x7485}>
      <g transform="translate(3,7)">
        <text class="seven-seg-display-txt" x={8.75} y={-4.5}>A:{x7485_data.a.toString(16)}</text>
        <text class="seven-seg-display-txt" x={8.75} y={-3.5}>B:{x7485_data.b.toString(16)}</text>
      </g>
    </DipPackage>
</main>

<style lang="scss">
  .seven-seg-display{
    stroke-width: .2;
      stroke: #fee;
  }
  .seven-seg-display.on{
    stroke: #f22;
  }
  .seven-seg-display.off{
    stroke: #5222;
  }
  .seven-seg-display-txt{
    font-family: 'Courier New', Courier, monospace;
    font-size: 1px;
    stroke: #0000;
    fill: #f22;
    stroke-width: .01;
  }
  .dip-card-container {
    /* Set up the container as a flex container */
    display: flex;
    /* Wrap the cards if they don't fit in a single row */
    flex-wrap: wrap;
    /* Space between the cards */
    gap: 16px;
    /* Align items in a centered manner */
    align-items: center;
    /* Justify content to start (you can change this as per your requirement) */
    justify-content: flex-start;
}

</style>
