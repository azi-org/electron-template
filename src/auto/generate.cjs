const  fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')

const resolve = (...file) => path.resolve(__dirname, ...file)
const logger = {
  info: message => console.log(chalk.blue(message)),
  success: message => console.log(chalk.green(message)),
  error: message => console.log(chalk.red(message))
}

const template = require('./template.cjs')

const generatefile = (path, data) => {
  if(fs.existsSync(path)) {
    logger.error(`${path}已存在`)
    return
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', err => {
      if(err) {
        logger.error(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

logger.info('请输入要生成的页面或组件名称，如：page:user/component:user ，默认生成在pages或components目录下')
// 形如： component:user 或者 page:user
process.stdin.on('data', async chunk => {
  const inputs = String(chunk).trim().split(':')
  const type = inputs[0]
  const name = inputs[1]
  const page_path = type === 'page' ? resolve('../pages', name) : resolve('../components', name)
  const vuefile = resolve(page_path, 'index.vue')

  const has_exists_dirtectory = fs.existsSync(page_path)
  if(has_exists_dirtectory) {
    logger.error(`${name}已存在，请重新输入`)
    return
  } else {
    logger.info(`正在生成${name}文件...`)
    await dotExistDirectoryCreate(page_path)
  }

  try {
    logger.info(`正在生成vue文件${vuefile}...`)
    const export_name = `${name.slice(0,1).toUpperCase()}${name.slice(1)}${type === 'page' ? 'Page': 'Comp'}`
    await generatefile(vuefile, template(export_name))
    logger.success('生成成功')
  } catch(error) {
    logger.error(error.message)
  }

  process.stdin.emit('end')
})

process.stdin.on('end', () => {
  logger.info('exit')
  process.exit()
})

function dotExistDirectoryCreate(directory) {
  return new Promise((resolve, reject) => {
    mkdirs(directory, () => {
      resolve(true)
    })
  })
}

function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if(exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), () => {
      fs.mkdirSync(directory)
      callback()
    })
  }
}