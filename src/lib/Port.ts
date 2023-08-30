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
export declare type HistoryPoint={timestamp:number,value:bit}
export class PortHistoryGraph{
    num:number=0
    name:string=""
    histo:Array<HistoryPoint>=[]
    histoLength=16
    copy():PortHistoryGraph{
        const phg=new PortHistoryGraph()
        phg.num=this.num
        phg.name=this.name
        phg.histo=this.histo
        phg.histoLength=this.histoLength
        return phg
    }
    static fromPort(port:Port):PortHistoryGraph{
        const phg=new PortHistoryGraph()
        phg.num=port.num
        phg.name=port.name
        return phg
    }
    add(port:Port):PortHistoryGraph{
        if(this.histo.length==this.histoLength){
            this.histo.shift()    
        }
        this.histo.push({timestamp:this.histo.length,value:port.isOn()?1:0})
        return this
    }
    graph():Array<HistoryPoint>{
        const r:Array<HistoryPoint>=this.histo
            .map( v => ({timestamp:v.timestamp,value:v.value}))
        return r
    }
    svgPath():string{
        const ZERO=-0.2
        const STEP=0.3
        const ONE=-0.8
        const vals = this.graph()
        return vals.reduce( (path,kv,i,a) =>{
            return `${path} L${i*STEP} ${(i==0)?ZERO:a[i-1].value*ONE} L${i*STEP} ${kv.value*ONE}`
        },`M${0} ${(vals[0]||{v:0}).value*ONE}`)
    }
}
export class PortsHistoryGraph{
    index:{[key:string]:PortHistoryGraph}={}
    histoLength=16
    copy():PortsHistoryGraph{
        const phg=new PortsHistoryGraph()
        phg.index=this.index
        phg.histoLength=this.histoLength
        return phg
    }
    add(ports:Ports):PortsHistoryGraph{
        const timestamp=Date.now()
        const kv=ports.forEach((port,i,a)=>{
            this.index[port.name]=this.index[port.name]||PortHistoryGraph.fromPort(port)
            this.index[port.name].add(port)
        })
        return this
    }
    graph(key:string):Array<HistoryPoint>{
        return this.index[key].graph()
    }
    graphs():{[key:string]:Array<HistoryPoint>} {
        return Object.keys(this.index)
            .reduce((agg,key) => {
                agg[key]=this.index[key].graph()
                return agg
            },{} as {[key:string]:Array<HistoryPoint>})
    }
    svgPath(key:string):string{
        return this.index[key].svgPath()
    }
    svgPaths():{[key:string]:string} {
        return Object.keys(this.index)
            .reduce((agg,key) => {
                agg[key]=this.svgPath(key)
                return agg
            },{} as {[key:string]:string})
    }
}