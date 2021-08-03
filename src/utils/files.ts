import { tmpdir } from 'os'
import { existsSync, MakeDirectoryOptions, mkdirSync } from 'fs'

export const tempDir = tmpdir()

export const ensureDirExists = (dir: string, options: MakeDirectoryOptions = { recursive: true }): void => {
    existsSync(dir) || mkdirSync(dir, options)
}
