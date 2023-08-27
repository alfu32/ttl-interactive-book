import type { Port } from "./Port";

export type StateChanger<T>=(current:T)=>T
export class Chip{
    ports:Array<Port>=[]
    changestate:StateChanger<Array<Port>>=a => a.map(v=>v)
}