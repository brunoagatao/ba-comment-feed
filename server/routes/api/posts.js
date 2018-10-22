const express = require('express');
const mongodb = require('mongodb');
const config = require('../../../config/config');

const router = express.Router();

const MLAB_URI = process.env.MLAB_URI || config.MLAB_URI;
const loadPostsCollection = async () => {
  const client = await mongodb.MongoClient.connect(
    config.MLAB_URI,
    { useNewUrlParser: true }
  );

  return client.db('ba-comment-feed').collection('posts');
};

router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

module.exports = router;
