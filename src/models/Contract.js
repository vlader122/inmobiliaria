import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  contractType: {
    type: String,
    enum: ['Sale', 'Rent', 'Lease', 'Other'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  terms: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;
