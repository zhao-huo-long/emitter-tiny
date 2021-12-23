import val from 'assert-tiny'

type F = (...a: any[]) => any

type EventBus = {
  [eventName: string]: F[]
}

export class Emitter {
  protected eventBus: EventBus = {}
  public on = (eventName: string, cb: F) => {
    val(eventName).isTypeOf(String, 'eventName must be a string')
    val(cb).isTypeOf(Function, 'callback must be a funtion')
    const { eventBus } = this
    if(Array.isArray(eventBus[eventName])){
      eventBus[eventName].push(cb)
      return
    }
    eventBus[eventName] = [cb]
    return this
  }
  public emit = (eventName: string, payload: unknown) => {
    val(eventName).isTypeOf(String, 'eventName must be a string')
    const { eventBus } = this
    if(Array.isArray(eventBus[eventName])){
      eventBus[eventName].forEach( cb => cb(payload) )
    }
  }
  public off = (eventName: string, cb: F) => {
    val(eventName).isTypeOf(String, 'eventName must be a string')
    val(cb).isTypeOf(Function, 'callback must be a funtion')
    const { eventBus } = this
    if(Array.isArray(eventBus[eventName])){
      eventBus[eventName] = eventBus[eventName].filter(func => cb !== func)
    }
  }

  public once = (eventName: string, cb: F) => {
    val(eventName).isTypeOf(String, 'eventName must be a string')
    val(cb).isTypeOf(Function, 'callback must be a funtion')
    const onceWrapper = (...arg: any[]) => {
      cb(...arg)
      this.off(eventName, onceWrapper)
    }
    this.on(eventName, onceWrapper)
  }
}

const emit = new Emitter()

export default emit