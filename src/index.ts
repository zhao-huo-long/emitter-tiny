import val from 'assert-tiny'

export type F = (...a: any[]) => any

export type EventBus = {
  [eventName: string]: F[]
}

export class Emitter {
  protected eventBus: EventBus = {}
  /**
   * add listener 
   * @param eventName String
   * @param cb Function
   * @returns this
   */
  public on = (eventName: string, cb: F) => {
    val(eventName).isTypeOf(String, 'eventName must be a string')
    val(cb).isTypeOf(Function, 'callback must be a funtion')
    const { eventBus } = this
    if (Array.isArray(eventBus[eventName])) {
      eventBus[eventName].push(cb)
    }else{
      eventBus[eventName] = [cb]
    }
    return this
  }
  /**
   * emit event
   * @param eventName String
   * @param payload Any
   */
  public emit = (eventName: string, payload: unknown) => {
    val(eventName).isTypeOf(String, 'eventName must be a string')
    const { eventBus } = this
    if (Array.isArray(eventBus[eventName])) {
      eventBus[eventName].forEach(cb => cb(payload))
    }
  }
  /**
   * remove event listener
   * @param eventName String
   * @param cb Function
   */
  public off = (eventName: string, cb: F) => {
    val(eventName).isTypeOf(String, 'eventName must be a string')
    val(cb).isTypeOf(Function, 'callback must be a funtion')
    const { eventBus } = this
    if (Array.isArray(eventBus[eventName])) {
      eventBus[eventName] = eventBus[eventName].filter(func => cb !== func)
    }
  }
  /**  
   *  event only emit once  
   * */
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


export default Emitter