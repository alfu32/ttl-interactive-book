<script lang="ts">
    import DipPackage from "./lib/DipPackage.svelte";
    import { Port } from "./lib/Port";
    let p4=new Array(8).fill(0).map((v,i) => Port.create({num:i+1}))
    let p8=new Array(16).fill(0).map((v,i) => Port.create({num:i+1}))
    let p10=new Array(20).fill(0).map((v,i) => Port.create({num:i+1}))
</script>

<main>
  <div>head</div>
  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="640" height="160" viewBox="0 0 640 160">
    <DipPackage ports={p4}/>
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="640" height="160" viewBox="0 0 640 160">
    <DipPackage ports={p8}/>
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="640" height="160" viewBox="0 0 640 160">
    <DipPackage ports={p10}/>
  </svg>
</main>

<style lang="scss">
</style>
