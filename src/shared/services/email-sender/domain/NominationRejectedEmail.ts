import { Email, EmailConstructor } from './Email'
import { Message } from './Message'
import { Subject } from './Subject'

type NominationRejectedEmailConstructor = Omit<EmailConstructor, 'subject' | 'message'>

export class NominationRejectedEmail extends Email {
  constructor({ to }: NominationRejectedEmailConstructor) {
    super({
      to,
      subject: new Subject('Sorry, your invitation has been rejected'),
      message: new Message(
        'We regret to inform you that the nominee does not meet the scoring requirements necessary to continue with the process.'
      ),
    })
  }
}
