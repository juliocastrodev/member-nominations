import { Email } from '../domain/Email'
import { EmailSender } from '../domain/EmailSender'

export class EmailSenderFake implements EmailSender {
  private readonly sentEmails: Email[] = []

  async send(email: Email): Promise<void> {
    this.sentEmails.push(email)
  }
}
