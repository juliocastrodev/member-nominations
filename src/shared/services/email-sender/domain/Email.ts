import { EmailAddress } from '../../../../application/users/domain/EmailAddress'
import { Snapshot } from '../../../domain/hex/Snapshot'
import { ValueObject } from '../../../domain/hex/ValueObject'
import { Message } from './Message'
import { Subject } from './Subject'

export type EmailConstructor = {
  subject: Subject
  to: EmailAddress
  message: Message
}

type EmailSnapshot = Snapshot<Email>

export class Email extends ValueObject {
  constructor(private readonly props: EmailConstructor) {
    super()
  }

  static toSnapshot(email: Email) {
    return email.toSnapshot()
  }

  toSnapshot() {
    return {
      subject: this.props.subject.toSnapshot(),
      to: this.props.to.toSnapshot(),
      message: this.props.message.toSnapshot(),
    }
  }

  static fromSnapshot(snapshot: EmailSnapshot) {
    return new Email({
      subject: new Subject(snapshot.subject),
      to: new EmailAddress(snapshot.to),
      message: new Message(snapshot.message),
    })
  }
}
