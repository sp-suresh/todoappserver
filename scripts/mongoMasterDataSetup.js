use todoDinoDb;

db.todoBuckets.createIndex( { idx: 1 }, { unique: true } )

print('Inserting Sample todoBuckets');
db.todoBuckets.insertMany([
  {
  "idx": 1,
  "nm": "Red"
  },
  {
  "idx": 2,
  "nm": "Green"
  },
  {
  "idx": 3,
  "nm": "Blue"
  }
]);
