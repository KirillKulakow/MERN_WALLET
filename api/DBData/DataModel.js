const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const DataShema = new Schema({
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  sum: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: false,
  },
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const transactionModel = mongoose.model('TransactionData', DataShema);

module.exports = transactionModel;
