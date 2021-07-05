import { tmpdir } from 'node:os'
import { existsSync, MakeDirectoryOptions, mkdirSync } from 'node:fs'

export const tempDir = tmpdir()

export const ensureDirExists = (dir: string, options: MakeDirectoryOptions = { recursive: true }): void => {
    existsSync(dir) || mkdirSync(dir, options)
}
