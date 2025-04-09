import { model, Schema } from 'mongoose';

const requestsSchema = new Schema(
  {
    fromCity: {
      type: String,
      required: true,
      trim: true,
    },
    toCity: {
      type: String,
      required: true,
      trim: true,
    },
    parcelType: {
      type: String,
      required: true,
      enum: ['gadgets', 'drinks', 'clothes', 'medicines', 'other'],
    },
    dispatchDate: {
      type: Date,
      required: true,
    },
    parcelDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RequestsCollection = model('requests', requestsSchema);
