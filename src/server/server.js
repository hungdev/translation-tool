// https://replit.com/@hungdev/get-all-path-of-object
//https://stackoverflow.com/questions/38362594/looks-like-when-i-do-fs-writefile-the-changed-file-restarts-nodemon-how-to-m
import _ from 'lodash'
import deepdash from 'deepdash'
import translate from '@vitalets/google-translate-api'
import fs from 'fs'
import path from 'path'
deepdash(_)

async function translateMessage(arr, lang) {
  try {
    const result = await Promise.allSettled(arr.map(e => translate(e, { to: lang || 'en' })))
    const mapToArrayMessage = result.map(e => e.value.text)
    return mapToArrayMessage
  } catch (error) {
    console.log(err)
  }
}

async function readJson() {
  const filePath = '/Users/cee/Desktop/relyon/multi-faktury/src/main/webapp/i18n/en/register.json'
  try {
    const jsonString = fs.readFileSync(filePath)
    const obj = JSON.parse(jsonString)
    return { data: obj, fileName: path.basename(filePath) }
  } catch (err) {
    console.log(err)
    return
  }
}


async function writeJson(fileName, data) {
  if (!fs.existsSync(`${process.cwd()}/translation-tool`)) {
    fs.mkdirSync(`${process.cwd()}/translation-tool`);
  }

  const filePath = `${process.cwd()}/translation-tool/${fileName}`
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


async function handleMain() {
  const parseJson = await readJson()
  const deepPath = _.index(parseJson.data)
  const allValues = Object.values(deepPath)
  const allKeys = Object.keys(deepPath)
  const listMessages = await translateMessage(allValues, 'vi')
  const rollBackJson = _.zipObjectDeep(allKeys, listMessages)
  writeJson(parseJson.fileName, rollBackJson)
}


handleMain()