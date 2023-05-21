import { OfficialRegistry } from '@worksheets/apps/registry';
import { Execution } from '@worksheets/engine';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const yaml = JSON.parse(req.body);
  const registry = new OfficialRegistry();
  const execution = new Execution({ registry });
  try {
    const output = await execution.run(yaml, undefined);
    res.status(200).json(output);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
