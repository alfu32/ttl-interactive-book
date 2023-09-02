import { Chip } from "./Chip"
import { Ports } from "./Port"

let dingDong=Chip.create({
    ports:Ports.createPortsFromNames("ding,nding,gnd,dong,ndong,vcc".split(',')),
    name:"74999",
    description:"Dual One Bit Ding Dong",
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