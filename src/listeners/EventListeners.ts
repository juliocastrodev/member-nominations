import { listeners as nominationsListeners } from '../listeners/nominations/listeners'

export class EventListeners {
  listen() {
    const listeners = [...nominationsListeners]

    listeners.forEach((listener) => listener.register())
  }
}
