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
}
export class Ports extends Array<Port>{

    static createPorts(num:number):Ports{
        return new Array(num).fill(0).map((v,i) => Port.create({num:i+1}))
    }
    static createPortsFromNames(a:Array<string>):Ports{
        return a.map((v,i) => Port.create({name:v,num:i+1}))
    }
}