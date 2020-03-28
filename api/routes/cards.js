'use strict'
const router = require('express').Router();

const cardController = require('../controllers/cards');

router.put('/add', (req, res) => {
  const cardData = req.body;
  if(!cardData) return res.status(400).send({ error:'Missing card data.' });

  const { name, image_url, color_identity, cmc, type, owned, used, oracle } = cardData;

  if(name === undefined || image_url === undefined || color_identity === undefined || cmc === undefined || type === undefined || owned === undefined || used === undefined || oracle === undefined) return res.status(400).send({ error:'Missing card data.' });

  cardController.addCard(name, image_url, color_identity, cmc, type, owned, used, oracle)
    .then(() => {
      console.log('it worked')
      res.status(200).send({ m:'card added' })
    }).catch(e => {
      console.log('it failed')
      res.status(500).send({ m:'something went wrong', error:e });
    });
});

router.post('/update', (req, res) => {
  const { id, owned, used } = req.body;
  if( !id || !owned || !used ) return res.status(400).send({ error:'Missing one or all of: "id", "owned", or "used" body parameters.' });
  cardController.updateCard(id, owned, used)
    .then(() => {
      res.status(200).send({ m:'card updated' });
    }).catch(e => {
      res.status(400).send({ m:'something went wrong', error:e });
    });
});

router.delete('/remove', (req, res) => {
  const { id } = req.body;
  if( !id ) return res.status(400).send({ error:'Missing "id" body parameter.' });
  cardController.removeCard(id)
    .then(() => {
      res.status(200).send({ m:'card removed' });
    }).catch(e => {
      res.status(400).send({ m:'something went wrong', error:e });
    });
});

router.get('/get', (req, res) => {
  const { name, type, color_identity, cmc, available, oracle, limit, offset } = req.query;
  cardController.getCards(name, type, color_identity, cmc, available, oracle, limit, offset)
    .then((data) => {
      res.status(200).send({ cards:data });
    }).catch(e => {
      res.status(400).send({ m:'something went wrong', error:e });
    });
});

module.exports = router;