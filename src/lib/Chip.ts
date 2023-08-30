import type { Port, Ports } from "./Port";

export type StateChanger<T>=(current:T)=>T
export class Chip{
    clone(): Chip {
        const chip=new Chip()
        chip.ports=this.ports
        chip.name=this.name
        chip.description=this.description
        chip._changestate=this._changestate
        chip._changestate=this._changestate
        chip.curentState=this.curentState
        chip.prevState=this.prevState
        chip.stable=this.prevState === this.curentState
        return chip
    }
    config(f:(self:Chip)=>void):this{
        f(this)
        return this
    }
    captureState():string{
        return this.ports.map( p => p.voltage).join("|")
    }
    public stable=false
    ports:Ports=[]
    name=""
    description=""
    public curentState=""
    public prevState=""
    public _changestate:StateChanger<Ports>=a => a.map(v=>v)
    static create(c:{ports:Ports,name?:string,description?:string,changestate:StateChanger<Ports>,curentState?:string,prevState?:string,}){
        const chip=new Chip()
        chip.ports=c.ports||[]
        chip.name=c.name||""
        chip.description=c.description||""
        chip._changestate=c.changestate
        return chip.next()
    }
    next():Chip{
        this.prevState=this.curentState
        this.ports=this._changestate(this.ports)
        this.curentState=this.ports.map(p=>p.voltage).join("|")
        this.stable=this.prevState === this.curentState
        return this.clone()
    }
}