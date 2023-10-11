import { readdir } from 'node:fs/promises'
import { extname, join } from 'node:path/posix'
import isArchive from 'is-archive'
import lodash from 'lodash-es'
import fse from 'fs-extra'
import { execa } from 'execa'

console.log(Bun.version)

const sources = '/home/i.want.to.believe/Games/mods'
const target =
  '/home/i.want.to.believe/Games/SteamLibrary/steamapps/common/Cyberpunk 2077/'

console.log('sources:', sources)
console.log('target:', target)

const decompressedDir = join(sources, 'decompressed')

fse.emptyDir(decompressedDir)
fse.ensureDir(decompressedDir)

const getExt = (path: string) => extname(path).slice(1).toLowerCase()

try {
  const paths = await readdir(sources)
  const archives = paths.filter((path) => isArchive(path))

  const groupedArchivesByExt = lodash.groupBy(archives, (archive: string) =>
    getExt(archive)
  )

  for (const [ext, mods] of Object.entries(groupedArchivesByExt)) {
    switch (ext) {
      case 'zip':
      case '7z':
      case 'rar':
        for (const mod of mods) {
          await execa('ark', [
            '-b',
            '-o',
            `${decompressedDir}`,
            `${join(sources, mod)}`,
          ])
          console.log('mod: ', mod)
        }
        break
      default:
        break
    }
    console.log('mods', mods)
  }
  console.log('exa')
  const { stdout } = await execa('exa', ['-T', `${decompressedDir}`])
  console.log(stdout)

  await fse.copy(decompressedDir, target)
} catch (err) {
  console.error(err)
}
