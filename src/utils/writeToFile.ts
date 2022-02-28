import fse from 'fs-extra'

export async function writeToFile(path: string, content: unknown) {
  if (!(await fse.pathExists(path))) await fse.createFile(path)

  await fse.writeJSON(path, content)
}
