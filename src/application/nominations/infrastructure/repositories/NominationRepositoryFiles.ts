import { config } from '../../../../config'
import { readFromFile } from '../../../../utils/readFromFile'
import { writeToFile } from '../../../../utils/writeToFile'
import { Nomination, NominationSnapshot } from '../../domain/Nomination'
import { NominationQuery } from '../../domain/NominationQuery'
import { NominationRepository } from '../../domain/NominationRepository'

const sourceFile = `${config.persistence.dir}/nominations.json`

export class NominationRepositoryFiles implements NominationRepository {
  async find({ refererEmail, nomineeEmail, status }: NominationQuery) {
    return (await this.snapshots())
      .filter(
        (nomination) =>
          (!nomineeEmail || nomination.nomineeEmail === nomineeEmail.toSnapshot()) &&
          (!refererEmail || nomination.refererEmail === refererEmail.toSnapshot()) &&
          (!status || nomination.status === status)
      )
      .map(Nomination.fromSnapshot)
  }

  async save(nomination: Nomination) {
    const snapshots = [...(await this.snapshots()), nomination.toSnapshot()]

    await writeToFile(sourceFile, snapshots)
  }

  async update(updatedNomination: Nomination) {
    const updatedSnapshot = updatedNomination.toSnapshot()
    const snapshots = await this.snapshots()

    const nominationIndex = snapshots.findIndex(
      (snapshot) => snapshot.nominationId === updatedSnapshot.nominationId
    )

    snapshots[nominationIndex] = updatedSnapshot

    await writeToFile(sourceFile, snapshots)
  }

  async snapshots() {
    return (await readFromFile<NominationSnapshot[]>(sourceFile)) ?? []
  }
}
