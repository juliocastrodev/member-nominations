import fse from 'fs-extra'

export async function readFromFile<T>(path: string): Promise<T | undefined> {
  if (!(await fse.pathExists(path))) return undefined

  return fse.readJson(path)
}
