<script lang="ts">
    import BinaryDisplay from "./lib/BinaryDisplay.svelte";
    import { Chip } from "./lib/Chip";
    import DipChip from "./lib/DipChip.svelte";
    import DipPackage from "./lib/DipPackage.svelte";
    import { Port, Ports } from "./lib/Port";
    import SevenSegmentDisplay from "./lib/SevenSegmentDisplay.svelte";
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
        x7447Ports=Ports.fromArray([crt[12],crt[11],crt[10],crt[9],crt[8],crt[14],crt[13]])
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
    let x7483_data={
      a:0,
      b:0,
      s:0,
    }
    let x7483=Chip.create({
      ports:Ports.createPortsFromNames("a4,s3,a3,b3,vcc,s2,b2,a2,s1,a1,b1,gnd,c0,c4,s4,b4".split(',')),
      name:"7483",
      description:"4-BIT BINARY FULL ADDERS WITH FAST CARRY",
      changestate:(crt:Ports)=>{
        const [a4,s3,a3,b3,vcc,s2,b2,a2,s1,a1,b1,gnd,c0,c4,s4,b4]=crt
        let a=a4.asNum()*8+a3.asNum()*4+a2.asNum()*2+a1.asNum()*1
        let b=b4.asNum()*8+b3.asNum()*4+b2.asNum()*2+b1.asNum()*1
        let s=a+b+c0.asNum()
        x7483_data={a,b,s}
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
      s:0,
    }
    let x7485=Chip.create({
      ports:Ports.createPortsFromNames("b3,agti,aeqi,alti,agto,aeqo,alto,gnd,b0,a0,b1,a1,b2,a2,a3,vcc".split(',')),
      name:"7485",
      description:"4-BIT MAGNITUDE COMPARATOR",
      changestate:(crt:Ports)=>{
        const [b3,agti,aeqi,alti,agto,aeqo,alto,gnd,b0,a0,b1,a1,b2,a2,a3,vcc]=crt
        let a=a3.asNum()*8+a2.asNum()*4+a1.asNum()*2+a0.asNum()*1
        let b=b3.asNum()*8+b2.asNum()*4+b1.asNum()*2+b0.asNum()*1
        let s=a<b?9:a==b?0:1
        x7485_data={a,b,s}
        agto.setOn(agti.isOn()&&(a>b))
        aeqo.setOn(aeqi.isOn()&&(a===b))
        alto.setOn(alti.isOn()&&(a<b))
        gnd.setOn(false)
        vcc.setOn(true)
        return crt
      }
    })
    let x7495_data={
      v:0,
      u:0,
    }
    let x7495=Chip.create({
      ports:Ports.createPortsFromNames("ser,b,c,vcc,d,mode,clk1,clk2,qd,qc,gnd,qb,qa,a".split(',')),
      name:"7495",
      description:"4-bit shift register, parallel in, parallel out, serial input;",
      changestate:(crt:Ports)=>{
        const [ser,b,c,vcc,d,mode,clk1,clk2,qd,qc,gnd,qb,qa,a]=crt
        let v=d.asNum()*8+c.asNum()*4+b.asNum()*2+a.asNum()*1
        let u=qd.asNum()*8+qc.asNum()*4+qb.asNum()*2+qa.asNum()*1
        if(vcc.isOn()){
          clk1.setOn(!clk1.isOn())
          clk2.setOn(!clk2.isOn())
          if(clk1.isOn()){
            const w=a.isOn()
            a.setOn(b.isOn())
            b.setOn(c.isOn())
            c.setOn(d.isOn())
            d.setOn(w)
          }
          if(clk2.isOn()){
            const w=qa.isOn()
            qa.setOn(qb.isOn())
            qb.setOn(qc.isOn())
            qc.setOn(qd.isOn())
            qd.setOn(w)
          }
          x7495_data={v,u}
        }
        gnd.setOn(false)
        return crt
      }
    })
</script>

<main class="dip-card-container" lang="ts">
    <DipChip scale={20} name="dingdong" portList="ding,nding,gnd,dong,ndong,vcc"
    description="dual oscillator flip flop"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail
          const [aa,na,gnd,bb,nb,vcc]=crt
          aa.setOn(!aa.isOn())
          na.setOn(!aa.isOn())
          bb.setOn(!bb.isOn())
          nb.setOn(!bb.isOn())
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} name="7400" portList="a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc"
      description="Quad Two Input NAND Gate"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail

          const [a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc]=crt
          y1.setOn(!(a1.isOn()&&b1.isOn()))
          y2.setOn(!(a2.isOn()&&b2.isOn()))
          y3.setOn(!(a3.isOn()&&b3.isOn()))
          y4.setOn(!(a4.isOn()&&b4.isOn()))
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} name="7402" portList="a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc"
      description="QUAD 2-INPUT NOR GATE"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail

          const [a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc]=crt
          y1.setOn(!(a1.isOn() || b1.isOn()))
          y2.setOn(!(a2.isOn() || b2.isOn()))
          y3.setOn(!(a3.isOn() || b3.isOn()))
          y4.setOn(!(a4.isOn() || b4.isOn()))
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="a1,y1,a2,y2,a3,y3,gnd,y4,a4,y5,a5,y6,a6,vcc" name="7404"
      description="Hex Inverter"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail

          const [a1,y1,a2,y2,a3,y3,gnd,y4,a4,y5,a5,y6,a6,vcc]=crt
          y1.setOn(!a1.isOn())
          y2.setOn(!a2.isOn())
          y3.setOn(!a3.isOn())
          y4.setOn(!a4.isOn())
          y5.setOn(!a5.isOn())
          y6.setOn(!a6.isOn())
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc" name="7408"
      description="Quad Two Input AND Gate"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail

          const [a1,b1,y1,a2,b2,y2,gnd,y3,a3,b3,y4,a4,b4,vcc]=crt
          y1.setOn( a1.isOn() && b1.isOn() )
          y2.setOn( a2.isOn() && b2.isOn() )
          y3.setOn( a3.isOn() && b3.isOn() )
          y4.setOn( a4.isOn() && b4.isOn() )
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc" name="7410"
      description="Triple 3-Input NAND Gate"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail
          const [a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc]=crt
          y1.setOn(!(a1.isOn()&&b1.isOn()&&c1.isOn()))
          y2.setOn(!(a2.isOn()&&b2.isOn()&&c2.isOn()))
          y3.setOn(!(a3.isOn()&&b3.isOn()&&c3.isOn()))
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="a1,b1,clr1,nq1,q2,cx2,rx2,gnd,a2,b2,cl2,nq2,q1,cx1,rx1,vcc" name="7412"
      description="Dual Retriggerable Monostable Multivibrators"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail
          const [a1,b1,clr1,nq1,q2,cx2,rx2,gnd,a2,b2,cl2,nq2,q1,cx1,rx1,vcc]=crt
          nq1.setOn(!q1.isOn())
          nq2.setOn(!q2.isOn())
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="a1,y1,a2,y2,a3,y3,gnd,y4,a4,y5,a5,y6,a6,vcc" name="7413"
      description="SCHMITT TRIGGERS DUAL GATE/HEX INVERTER"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail
          const [a1,y1,a2,y2,a3,y3,gnd,y4,a4,y5,a5,y6,a6,vcc]=crt
          y1.setOn(!a1.isOn())
          y2.setOn(!a2.isOn())
          y3.setOn(!a3.isOn())
          y4.setOn(!a4.isOn())
          y5.setOn(!a5.isOn())
          y6.setOn(!a6.isOn())
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc" name="7415"
      description="TRIPLE 3-INPUT AND GATE"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail
          const [a1,b1,a2,b2,c2,y2,gnd,y3,a3,b3,c3,y1,c1,vcc]=crt
          y1.setOn(a1.isOn()&&b1.isOn()&&c1.isOn())
          y2.setOn(a2.isOn()&&b2.isOn()&&c2.isOn())
          y3.setOn(a3.isOn()&&b3.isOn()&&c3.isOn())
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc" name="7420"
      description="Dual 4 input NAND Gate"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail
          const [a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc]=crt
          y1.setOn(!(a1.isOn()&&b1.isOn()&&c1.isOn()&&d1.isOn()))
          y2.setOn(!(a2.isOn()&&b2.isOn()&&c2.isOn()&&d2.isOn()))
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc" name="7421"
      description="Dual 4 input AND Gate"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail
          const [a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc]=crt
          y1.setOn((a1.isOn()&&b1.isOn()&&c1.isOn()&&d1.isOn()))
          y2.setOn((a2.isOn()&&b2.isOn()&&c2.isOn()&&d2.isOn()))
          gnd.setOn(false)
        }
      }
    />
    <DipChip scale={20} portList="aa1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc" name="7425"
      description="Dual 4 input NOR Gate"
      on:statechange={(e) => {
          console.log(e.detail)
          const crt=e.detail
          const [a1,b1,nc3,c1,d1,y1,gnd,y2,a2,b2,nc2,c2,d2,vcc]=crt
          y1.setOn(!(a1.isOn()||b1.isOn()||c1.isOn()||d1.isOn()))
          y2.setOn(!(a2.isOn()||b2.isOn()||c2.isOn()||d2.isOn()))
          gnd.setOn(false)
        }
      }
    />
    <DipPackage scale={20} chip={x7447}>
      <g transform="translate(3,7)">
      <SevenSegmentDisplay digit={x7447Value}/>
      <text class="seven-seg-display-txt" x={.75} y={6.5}>{x7447Value.toString(16)}</text>
      </g>
    </DipPackage>
    <DipChip scale={20} portList="d2,d3,lt,nbi,nbo,d4,d1,gnd,e,d,c,b,a,g,f,vcc" name="7447"
      description="BCD-to-Seven-Segment Decoders"
      on:statechange={(evt) => {
          console.log(evt.detail)
          const crt=evt.detail
          const [d2,d3,lt,nbi,nbo,d4,d1,gnd,e,d,c,b,a,g,f,vcc]=crt
          const num= crt.numericalValueOf("d1,d2,d3,d4")
          a.setOn([0,2,3,5,6,7,8,9,10,12,14,15].indexOf(num)>-1)
          b.setOn([0,1,2,3,4,7,8,9,10,13].indexOf(num)>-1)
          c.setOn([0,1,3,4,5,6,7,8,9,10,11,13].indexOf(num)>-1)
          d.setOn([0,2,3,5,6,8,9,11,12,13,14].indexOf(num)>-1)
          e.setOn([0,2,6,8,10,11,12,13,14,15].indexOf(num)>-1)
          f.setOn([0,4,5,6,8,9,10,11,12,14,15].indexOf(num)>-1)
          g.setOn([2,3,4,5,6,8,9,10,11,13,14,15].indexOf(num)>-1)
          x7447Ports=crt.extract("a,b,c,d,e,f,g")
          x7447Value=num
          gnd.setOn(false)
        }
      }
      
    >
      <pre let:cs={cs} slot="text">{JSON.stringify(cs().ports.map(p => [p.name,p.isOn()?1:0]))}</pre>
      <g let:cs={cs} slot="canvas" transform="translate(3,7)" >
        <SevenSegmentDisplay digit={cs().ports.numericalValueOf("a,b,c,d,e,f,g")}/>
        <text  class="seven-seg-display-txt" x={.75} y={6.5}>{cs().ports.numericalValueOf("d1,d2,d3,d4").toString(16)}</text>
      </g>
    </DipChip>
    <DipPackage scale={20} chip={x7469}>
      <g transform="scale(.5)">
        <SevenSegmentDisplay digit={x7469_data.a} x={24} y={3}/>
        <SevenSegmentDisplay digit={x7469_data.b} x={28} y={3}/>
        <text class="seven-seg-display-txt" x={8.75} y={-4.5}>CNT1:{x7469_data.a.toString(16)}</text>
        <text class="seven-seg-display-txt" x={8.75} y={-3.5}>CNT2:{x7469_data.b.toString(16)}</text>
      </g>
    </DipPackage>
    <DipPackage scale={20} chip={x7483}>
      <g transform="scale(.5)">
        <SevenSegmentDisplay digit={x7483_data.a} x={20} y={3}/>
        <SevenSegmentDisplay digit={x7483_data.b} x={23.5} y={3}/>
        <SevenSegmentDisplay digit={x7483_data.s} x={27} y={3}/>
        <BinaryDisplay bits={4} height={0} digit={x7483_data.a} x={22} y={9.2}/>
        <BinaryDisplay bits={4} height={0} digit={x7483_data.b} x={22} y={10.5}/>
        <BinaryDisplay bits={4} height={0} digit={x7483_data.s} x={22} y={11.9}/>
        <text class="seven-seg-display-txt" x={8.75} y={-4.5}>A:{x7483_data.a.toString(16)}</text>
        <text class="seven-seg-display-txt" x={8.75} y={-3.5}>B:{x7483_data.b.toString(16)}</text>
        <text class="seven-seg-display-txt" x={8.75} y={-2.5}>S:{(x7483_data.s).toString(16)}</text>
      </g>
    </DipPackage>
    <DipPackage scale={20} chip={x7485}>
      <g transform="scale(.5)">
        <SevenSegmentDisplay digit={x7485_data.a} x={20} y={3}/>
        <SevenSegmentDisplay digit={x7485_data.b} x={24} y={3}/>
        <BinaryDisplay bits={4} height={0} digit={x7485_data.s} x={21} y={9}/>
        <text class="seven-seg-display-txt" x={8.75} y={-4.5}>A:{x7485_data.a.toString(16)}</text>
        <text class="seven-seg-display-txt" x={8.75} y={-3.5}>B:{x7485_data.b.toString(16)}</text>
        <text class="seven-seg-display-txt" x={8.75} y={-2.5}>S:{(x7485_data.s).toString(16)}</text>
      </g>
    </DipPackage>
    <DipPackage scale={20} chip={x7495}>
      <g transform="scale(.5)">
        <SevenSegmentDisplay digit={x7495_data.v} x={22} y={1}/>
        <SevenSegmentDisplay digit={x7495_data.u} x={22} y={7}/>
        <BinaryDisplay bits={4} height={0} digit={x7495_data.v} x={26} y={5.5}/>
        <BinaryDisplay bits={4} height={0} digit={x7495_data.u} x={26} y={11.5}/>
      </g>
    </DipPackage>
</main>

<style lang="scss">
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
