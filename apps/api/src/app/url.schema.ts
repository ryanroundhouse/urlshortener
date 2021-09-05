import { model, Schema, Model, Document } from 'mongoose';

export interface IUrl extends Document {
  code: string;
  url: string;
}

const UrlSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  url: { type: String, required: true },
});

export const Url: Model<IUrl> = model('Url', UrlSchema);
