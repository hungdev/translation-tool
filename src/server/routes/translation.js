import express from 'express';
import upload from '../utils/upload'
import _ from 'lodash'
import deepdash from 'deepdash'
import { translateMessage, readJson, writeJson } from '../utils/helpers'
deepdash(_)

const router = express.Router();

router.post('/', upload.array('files', 1), async (req, res) => {
  const { outputPath, lang } = req.body;
  const parseJson = await readJson(req?.files?.[0]?.path)
  const deepPath = _.index(parseJson.data)
  const allValues = Object.values(deepPath)
  const allKeys = Object.keys(deepPath)
  const listMessages = await translateMessage(allValues, lang)
  const rollBackJson = _.zipObjectDeep(allKeys, listMessages)
  writeJson(parseJson.fileName, rollBackJson, outputPath)

  res.send({
    error: 0,
  });
});

export default router;