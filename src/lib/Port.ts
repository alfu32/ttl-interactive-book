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
    copy(): Ports {
        const copy=this.map(v => v.copy())
        const ports=Ports.fromArray(copy)
        ports.timestamp=this.timestamp
        return ports
    }
    timestamp=Date.now()
    static fromArray(a:Array<Port>):Ports{
        const ports=new Ports()
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

export class PortsHistoryGraph{
    histo:Array<{timestamp:number,values:{[key:string]:number}}>=[]
    keys:{[key:string]:boolean}={}
    add(ports:Ports){
        const kv=ports.reduce((acc,v,i,a)=>{
            acc[v.name]=v.voltage
            this.keys[v.name]=true
            return acc
        },{} as {[key:string]:number})
        this.histo.push({timestamp:ports.timestamp,values:kv})
    }
    graph(key:string):Array<{t:number,v:number}>{
        const t0=(this.histo[0]||{timestamp:0}).timestamp
        const r:Array<{t:number,v:number}>=this.histo
            .map( v => ({t:v.timestamp-t0,v:v.values[key]}))
        return r
    }
    graphs():{[key:string]:Array<{t:number,v:number}>} {
        return Object.keys(this.keys)
            .reduce((agg,key) => {
                agg[key]=this.graph(key)
                return agg
            },{} as {[key:string]:Array<{t:number,v:number}>})
    }
}