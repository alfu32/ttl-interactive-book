<script lang="ts">
    import { Chip } from "./lib/Chip";
    import DipPackage from "./lib/DipPackage.svelte";
    import { Port } from "./lib/Port";
    let p4=new Array(8).fill(0).map((v,i) => Port.create({num:i+1}))
    let p8=new Array(16).fill(0).map((v,i) => Port.create({num:i+1}))
    let p10=new Array(20).fill(0).map((v,i) => Port.create({num:i+1}))
    let chip1=Chip.create({
      ports:Port.createPorts(8),
      changestate:(crt:Array<Port>)=>{
        crt[3].setOn(crt[1].isOn()&&crt[2].isOn())
        crt[6].setOn(crt[4].isOn()&&crt[5].isOn())
        return crt
      }
    })
</script>

<main>
  <div>head</div>
  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="640" height="160" viewBox="0 0 640 160">
    <DipPackage ports={chip1.ports} on:statechanged={e => chip1.ports=chip1.changestate(chip1.ports)}/>
  </svg>
</main>

<style lang="scss">
</style>
