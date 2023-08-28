import type { Port } from "./Port";

export type StateChanger<T>=(current:T)=>T
export class Chip{
    clone(): Chip {
        return Chip.create(this)
    }
    ports:Array<Port>=[]
    name=""
    description=""
    changestate:StateChanger<Array<Port>>=a => a.map(v=>v)
    static create(c:{ports:Array<Port>,name?:string,description?:string,changestate:StateChanger<Array<Port>>}){
        const chip=new Chip()
        chip.ports=c.ports||[]
        chip.name=c.name||""
        chip.description=c.description||""
        chip.changestate=c.changestate||(a => a.map(v=>v))
        return chip
    }
}