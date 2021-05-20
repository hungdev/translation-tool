import _ from 'lodash'
import translate from '@vitalets/google-translate-api'
import fs from 'fs'
import path from 'path'

export const translateMessage = async (arr, lang = 'vi') => {
  try {
    const result = await Promise.allSettled(arr.map(e => translate(e, { to: lang })))
    const mapToArrayMessage = result.map(e => e.value.text)
    return mapToArrayMessage
  } catch (error) {
    console.log('translateMessage', error)
  }
}

export const readJson = async (filePath) => {
  // const filePath = '/Users/cee/Desktop/relyon/multi-faktury/src/main/webapp/i18n/en/register.json'
  try {
    const jsonString = fs.readFileSync(filePath)
    const obj = JSON.parse(jsonString)
    return { data: obj, fileName: path.basename(filePath) }
  } catch (err) {
    console.log('readJson', err)
    return
  }
}


export const writeJson = async (fileName, data, outputPath = 'translation-tool') => {
  if (!fs.existsSync(`${process.cwd()}/${outputPath}`)) {
    fs.mkdirSync(`${process.cwd()}/${outputPath}`);
  }

  const filePath = `${process.cwd()}/${outputPath}/${fileName}`
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}