# A Basic Todo App(beta)


## How to run

1. Clone this repo
2. `$ cd ./todoappserver`
3. `$ npm install`
4. To start/restart use `$ pm2 restart ./ecosystem.config.js --env development --update-env`
5. Monitor the logs using `$ pm2 logs 'Todo APP Server'`

# API Documentation

1. Get todo bucket types
`
Url: /api/todo/buckets
Methos: GET
Response:
[
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
]
`

2. Add a new Todo

`
Url: /api/todo
Method: POST
Response:
{msg: 'Todo added successfully'}
`

3. Get Todos

`
Url: /api/todo/?bucketId=3&lmt=2&off=1
Method: GET
Response:
{
  "ttc": 4,
  "todoList": [
    {
      "_id": "5bd9887fde4f882c275a7795",
      "uid": 1,
      "desc": "first todo desc",
      "title": "first",
      "bucket": "Red"
    },
    {
      "_id": "5bd988a5de4f882c275a7796",
      "uid": 1,
      "desc": "second todo desc",
      "title": "Second",
      "bucket": "Green"
    }
  ]
}
`