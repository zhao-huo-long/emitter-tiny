# emitter-tiny
a event emitter, very tiny. 一个非常轻量的事件触发器

#### install
npm or yarn
```shell
npm install emitter-tiny

yarn add emitter-tiny
```

#### on & emit
```ts
import event from 'emitter-tiny'
const e = new event()
e.on('event-name', (v) => {
  console.log(v)
})
e.emit('event-name', { eventVal: 'hello' })
```

#### once
event handler only emit once. 事件处理函数只会触发一次.
```ts
import event from 'emitter-tiny'
const e = new event()
e.once('event-name', (v) => {
  console.log(v)
})
e.emit('event-name', { eventVal: 'hello' }) /*  will emit handler  */
e.emit('event-name', { eventVal: 'hello' }) /*  don't emit handler  */
e.emit('event-name', { eventVal: 'hello' }) /*  don't emit handler  */
```

#### off
cancel event handler. 取消事件处理函数
```ts
import event from 'emitter-tiny'
const e = new event()
const cb = (v) => {
  console.log(v)
}
e.on('event-name', cb)
e.off('event-name', cb)
e.emit('event-name', { eventVal: 'hello' }) /* dont emit handler  */
```
