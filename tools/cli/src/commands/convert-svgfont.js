import svgr from '@svgr/core'
import { convertSvgFont } from '@svgr-iconkit/build-utils'
import FS from 'fs'
import Path from 'path'
import ChildProcess from 'child_process'
import cliProgress from 'cli-progress'
import {
  readFile,
  writeFile,
  getCamelIconName,
  paramCase,
  camelCase,
  createRootIconset,
  resolvePackagePath,
} from '../utils'
import { createIconsMapTs, createDefaultExportJs, createIndexContent, createExportAllJs } from '../templates'

const commandName = 'convert-svgfont'

function buildIconFolder({ name, native = true, ref = true, indexFile, sourcePath, targetPath }) {
  return new Promise((resolve, reject) => {
    const sourceFileContent = readFile(sourcePath)
    const componentName = 'SVG' + camelCase(name, { pascalCase: true })
    svgr(sourceFileContent, { icon: true, native, ref, typescript: true }, { componentName })
      .then(jsCode => {
        if (native) {
          jsCode = jsCode.replace(/ (className|xmlns)=".*"/, '')
        }
        writeFile(targetPath, jsCode)
        resolve()
      })
      .catch(error => reject(error))
  })
}

const platforms = {
  web: {
    native: false,
    sourceIndex: 'web/index.ts',
    defaultIndex: 'index.ts',
    defaultIndexTarget: 'web/index',
  },
  native: {
    native: true,
    sourceIndex: 'native/index.ts',
  },
}
module.exports = {
  name: `${commandName}`,
  options: [
    {
      flag: '-i, --input-path <input-path>',
      description: 'Input path',
    },
    {
      flag: '-o, --output-path <output-path>',
      description: 'Output path',
    },
    {
      flag: '-p, --package-name <packageName>',
      description: 'inputPath resolved by a package',
    },
    {
      flag: '-d, --dynamic-import',
      description: 'Use dynamic import syntax',
    },
    {
      flag: '-rp, --remove-name-prefix <name>',
      description: 'Remove name prefix',
    },
    {
      flag: '-rs, --remove-name-suffix <name>',
      description: 'Remove name suffix',
    },
    {
      flag: '-s, --start-with <content>',
      description: 'Searching file name start with given string',
    },
    {
      flag: '-e, --end-with <content>',
      description: 'Searching file name end with given string',
    },
    {
      flag: '-tp, --target-file-prefix <prefixName>',
      description: 'Target file prefix',
    },
    {
      flag: '-ts, --target-file-suffix <prefixName>',
      description: 'Target file suffix',
    },
    {
      flag: '--disable-convert-xlink',
    },
    {
      flag: '--fill-color <color>',
    },
    {
      flag: '--stroke-color <color>',
    },
  ],
  exec: async (options, cmd) => {
    console.log(commandName + ': options=%o', options)
    const {
      inputPath = '',
      outputPath = '',
      removeNamePrefix,
      removeNameSuffix,
      startWith = '',
      endWith = '',
      packageName,
      targetFilePrefix = '',
      targetFileSuffix = '',
      fillColor,
      strokeColor,
      disableConvertXlink = false,
      dynamicImport = false,
    } = options
    if (!FS.existsSync(outputPath)) {
      FS.mkdirSync(outputPath, { recursive: true })
    }
    // Selecting parent directory, direct is local
    let _parentDirectory = process.cwd()
    if (packageName) {
      _parentDirectory = await resolvePackagePath(packageName)
    }
    // If given inputPath from a root absolute path, ignore _parentDirectory.
    if (String(inputPath).startsWith('/')) {
      _parentDirectory = null
    }
    // Getting source directory from local
    const resolvedSourceDir = _parentDirectory ? Path.resolve(_parentDirectory, inputPath) : Path.resolve(inputPath)

    const resolvedTargetDir = Path.resolve(outputPath)
    const resolvedTargetIndexFilePath = Path.join(outputPath, 'index.ts')

    const startWithPattern = startWith ? startWith : null
    const endWithPattern = endWith ? `${endWith}.svg` : '.svg'
    const fontFiles = resolvedSourceDir.endsWith(endWithPattern)
      ? [resolvedSourceDir]
      : FS.readdirSync(resolvedSourceDir).filter(file => {
          if (startWithPattern && !file.startsWith(startWithPattern)) return false
          if (endWithPattern && !file.endsWith(endWithPattern)) return false
          return true
        })
    const iconsetMap = {}

    console.log(commandName + ': total matched files=%o', fontFiles.length)
    console.log(commandName + ': resolvedTargetDir=%o', resolvedTargetDir)

    const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    let counter = fontFiles.length
    pbar.start(counter, 0)
    for (const fontFileName of fontFiles) {
      const iconJsFileName = `${fontFileName}.tsx`

      const sourcePath = resolvedSourceDir === fontFileName ? resolvedSourceDir : Path.join(resolvedSourceDir, fontFileName)

      const icons = await convertSvgFont(fontFileName, sourcePath, {
        fillColor,
        strokeColor,
        typescript: true,
        disableConvertXlink,
      })
      counter = counter - 1 + icons.length
      pbar.setTotal(counter)
      for (const icon of icons) {
        const iconName = paramCase(icon.name)

        const tarFileName = `${targetFilePrefix}${iconName}${targetFileSuffix}`

        const tarFilePath = Path.resolve(resolvedTargetDir, tarFileName + '.ts')
        writeFile(tarFilePath, icon.code)

        iconsetMap[iconName] = `./${tarFileName}`
        pbar.increment(1)
      }
    }
    pbar.stop()

    // Creating icons map typescript files to specified file
    const output = dynamicImport ? createIconsImportMapTs(iconsetMap) : createIconsMapTs(iconsetMap)
    writeFile(resolvedTargetIndexFilePath, output)

    console.log(commandName + ': done')
    return Promise.resolve()
  },
}
