import {isSecure} from '../../services/secure';
import {addListen, getListens, getListensCount} from '../../services/listens';

export default async (req, res) => {
  if (req.method === 'POST') {
    await addListenHandler(req, res);
  } else if (req.method === 'GET') {
    await getListensHandler(req, res);
  } else {
    res.status(404).end();
  }
};

async function addListenHandler(req, res) {
  try {
    if (!req.body || !req.body.album || !req.body.song) {
      res.status(400).json({message: 'Invalid POST body'});
    } else {
      await addListen(req.body.album, req.body.song, req.socket.remoteAddress);
      res.status(200).json({success: true});
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

async function getListensHandler(req, res) {
  try {
    if (!isSecure(req)) {
      res.status(400).json({message: 'Invalid token'});
    } else {
      if (req.query.count) {
        const count = await getListensCount(req.query.album, req.query.song);
        res.status(200).json({count});
      } else {
        const listens = await getListens();
        res.status(200).json(listens);
      }
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

