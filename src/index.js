const mongoose = require('mongoose');

const connectionStr = 'mongodb://mongodb';
mongoose
  .connect(connectionStr, {
    dbName: 'demo',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch((err) => {
    console.log(err);
  });

const pipeline = [
  {
    $match: {
      $or: [{ operationType: 'insert' }, { operationType: 'update' }],
      'fullDocument.name': 'Test'
    }
  }
];

const Post = mongoose.model('Post', new mongoose.Schema({ name: String }));
const changeStream = Post.watch(pipeline);

setInterval(() => {
  Post.create({ name: 'Test' });
}, 10000);

changeStream.on('change', (next) => {
  console.log('Changed happened: ', next);
  switch (next.operationType) {
    case 'insert':
      console.log('an insert happened...', 'uni_ID: ', next.fullDocument);
      break;
    case 'update':
      console.log('an update happened...');
      break;
    case 'delete':
      console.log('a delete happened...');
      break;
    default:
      break;
  }
});
