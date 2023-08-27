import type { Port } from "./Port";

export type StateChanger<T>=(current:T)=>T
export class Chip{
    ports:Array<Port>=[]
    changestate:StateChanger<Array<Port>>=a => a.map(v=>v)
    static create(c:{ports:Array<Port>,changestate:StateChanger<Array<Port>>}){
        const chip=new Chip()
        chip.ports=c.ports||[]
        chip.changestate=c.changestate||(a => a.map(v=>v))
        return chip
    }
}