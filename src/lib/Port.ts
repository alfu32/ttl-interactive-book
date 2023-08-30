export class Port{
    public num:number=1;
    public name:string="";
    public voltage:number=0
    public isAnalog=true
    constructor(num:number){
        this.num=num
        this.name=`P${num}}`
        this.voltage=0
    }
    static create(c:{num:number,name?:string,voltage?:number}):Port{
        const p=new Port(c.num)
        p.num=c.num
        p.name=c.name||`P${c.num}`
        p.voltage=c.voltage||0
        return p
    }
    isOn():boolean{
        return this.voltage>=3.3
    }
    asNum():number{
        return this.voltage>=3.3?1:0
    }
    setOn(isOn:boolean):this{
        this.voltage=isOn?5:0
        return this
    }
    setAnalog(value:number):this{
        this.voltage=value
        return this
    }
    copy(): any {
        return Port.create(this)
    }
}
export class Ports extends Array<Port>{
    timestamp=Date.now()
    copy(): Ports {
        const cp=this.map(v => v.copy())
        const ports=Ports.fromArray(cp)
        ports.timestamp=this.timestamp
        return ports
    }
    static fromArray(a:Array<Port>):Ports{
        const ports=new Ports()
        ports.timestamp=Date.now()
        a.forEach((v,i) => ports[i]=v)
        return ports
    }
    static createPorts(num:number):Ports{
        return Ports.fromArray(new Array(num).fill(0).map((v,i) => Port.create({num:i+1})))
    }
    static createPortsFromNames(a:Array<string>):Ports{
        return Ports.fromArray(a.map((v,i) => Port.create({name:v,num:i+1})))
    }
}
export declare type bit=0|1
export class PortsHistoryGraph{
    histo:Array<{timestamp:number,values:{[key:string]:bit}}>=[]
    keys:{[key:string]:boolean}={}
    histoLength=16
    copy():PortsHistoryGraph{
        const phg=new PortsHistoryGraph()
        phg.histo=this.histo
        phg.keys=this.keys
        phg.histoLength=this.histoLength
        return phg
    }
    add(ports:Ports):PortsHistoryGraph{
        const kv=ports.reduce((acc,v,i,a)=>{
            acc[v.name]=v.isOn()?1:0
            this.keys[v.name]=true
            return acc
        },{} as {[key:string]:bit})
        if(this.histo.length==this.histoLength){
            this.histo.shift()    
        }
        this.histo.push({timestamp:this.histo.length,values:kv})
        return this
    }
    graph(key:string):Array<{t:number,v:bit}>{
        const r:Array<{t:number,v:bit}>=this.histo
            .map( v => ({t:v.timestamp,v:v.values[key]||0}))
        return r
    }
    graphs():{[key:string]:Array<{t:number,v:bit}>} {
        return Object.keys(this.keys)
            .reduce((agg,key) => {
                agg[key]=this.graph(key)
                return agg
            },{} as {[key:string]:Array<{t:number,v:bit}>})
    }
    svgPath(key:string):string{
        const vals = this.graph(key)
        return vals.reduce( (path,kv,i,a) =>{
            return `${path} L${kv.t} ${i==0?0:a[i-1].v} L${kv.t} ${kv.v}`
        },`M0 ${(vals[0]||{v:0}).v}`)
    }
    svgPaths():{[key:string]:string} {
        return Object.keys(this.keys)
            .reduce((agg,key) => {
                agg[key]=this.svgPath(key)
                return agg
            },{} as {[key:string]:string})
    }
}