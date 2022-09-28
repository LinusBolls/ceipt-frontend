import { Document } from 'mongoose';
import Receipt from '../definitions/Receipt';
import ReceiptModel, { receiptProperties } from '../models/receipt.model';
import initMongoose from '../utils/initMongoose';

function normalize(receipt: Document<Receipt>): Receipt | null {

  if (!receipt) {
    return null;
  }
  // @ts-ignore
  const normalizedReceipt: Receipt = { ...receipt.toObject(), products: receipt.products.map(i => ({ ...i.toObject(), _id: i._id.toString() })) }

  return normalizedReceipt
}

const interceptors = [initMongoose]

const receiptController = {

  create: async (receiptData: typeof receiptProperties) => {
    await Promise.all(interceptors.map(i => i()))

    const doc = await ReceiptModel.create({
      image: receiptData.image,
      ownerName: receiptData.ownerName,
      products: receiptData.products,
      score: receiptData.score,
    });
    return normalize(doc);
  },
  getById: async (receiptId: string) => {
    await Promise.all(interceptors.map(i => i()))

    const doc = await ReceiptModel.findOne({ _id: receiptId });

    return normalize(doc);
  },
  getByOwnerUserId: async (ownerUserId: string) => {
    await Promise.all(interceptors.map(i => i()))

    const docs = await ReceiptModel.find({ ownerUserId });

    return docs.map(normalize);
  },
  getAll: async () => {
    await Promise.all(interceptors.map(i => i()))

    try {
      const docs = await ReceiptModel.find({});

      return docs.map(normalize);

    } catch (err) {

      console.error("error at ReceiptModel.find({}):", err)

      return []
    }

  },
};
export default receiptController;
