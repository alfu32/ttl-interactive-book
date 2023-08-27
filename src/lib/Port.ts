export class Port{
    public num:number=1;
    public name:string="";
    public voltage:number=0
    constructor(num:number){
        this.num=num
        this.name=`P${num}}`
        this.voltage=0
    }
    static create(c:{num:number,name?:string,voltage?:number}):Port{
        const p=new Port()
        p.num=c.num
        p.name=c.name||`P${c.num}`
        p.voltage=c.voltage||0
        return p
    }
    static createPorts(num:number):Array<Port>{
        return new Array(num).fill(0).map((v,i) => Port.create({num:i+1}))
    }
    isOn():boolean{
        return this.voltage>=3.3
    }
    setOn(isOn:boolean):this{
        this.voltage=isOn?4.8:0
        return this
    }
}