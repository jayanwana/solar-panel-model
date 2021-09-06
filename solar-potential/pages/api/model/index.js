import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getModelInputs, insertModelInputs } from '@/db/index';
import { SolarPanel } from '@/lib/panel-model';

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }
  if (!req.body.roofArea) return res.status(400).send('Please Enter a roof area');
  if (!req.body.roofAngle) return res.status(400).send('Please enter the roof angle');
  if (!req.body.panelEfficiency) return res.status(400).send('Please select a solar panel type');
  if (!req.body.clientBudget) return res.status(400).send('Please enter the client budget');
  // if (!req.body.userId) return res.status(400).send('No User');
  const modelParams = await insertModelInputs(req.db, { ...req.body, userId: req.user._id });
  const solarModel = new SolarPanel(
    modelParams.roofArea,
    modelParams.roofAngle,
    modelParams.panelEfficiency,
    modelParams.panelCost,
  );
  solarModel.calcPowerGeneratedOverSolstices();
  return res.json({
    modelParams,
    powerGenerated: solarModel.powerGenerated,
    totalCost: solarModel.totalCost,
  });
  // return res.status(200).send('success')
  //
  // if (modelParams) {
  // }
  // return res.status(500);
});

export default handler;
