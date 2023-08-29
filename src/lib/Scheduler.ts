
export declare type Runnable=()=>void
export class Task{
    created=Date.now()
    expected=Date.now()
    executed=false

    runnable:Runnable=()=>{}
    public static create(cfg:{fn:Runnable,waitTime:number}):Task{
        const t=new Task()
        t.runnable=cfg.fn
        t.expected=t.created+cfg.waitTime
        return t
    }
}
export class Scheduler{
    tasks:Array<Task>=[]
    handle:number=0
    public static create():Scheduler{
        const sch = new Scheduler()
        sch.handle=setInterval(()=>{
            const tr=Date.now()
            sch.tasks.forEach(t=>{
                if(t.expected<tr && !t.executed){
                    try{
                        t.runnable()
                    }catch(err){}
                    t.executed=true
                }
            })
            sch.tasks=sch.tasks.filter(t=>!t.executed)
        },1)
        return sch
    }
    schedule(fn:Runnable,waitTime:number):this{
        this.tasks.push(Task.create({fn,waitTime}))
        return this
    }
    close():this{
        clearInterval(this.handle)
        this.tasks=[]
        return this
    }
}