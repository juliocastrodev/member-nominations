import { Api } from './api/Api'
import { EventListeners } from './listeners/EventListeners'

const api = new Api()
const eventListeners = new EventListeners()

api.listen()
eventListeners.listen()
