import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import receiptController from '../../../../controllers/receipt.controller';

export default nc({}).post(async (req: NextApiRequest, res: NextApiResponse) => {
    //   const data = await receiptController.create(req.body);

    //   if (!data) {
    //     res.status(400).json({ ok: false, msg: 'failed to create receipt' });
    //     return;
    //   }

    const data = (await receiptController.getByOwnerUserId("linus-balls")).slice(0, 1)

    res.json({ ok: true, data });
});