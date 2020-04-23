import {isSecure} from '../../services/secure';
import {addSubscription, getSubscriptions} from '../../services/subscriptions';

export default async (req, res) => {
  if (req.method === 'POST') {
    await addSubscriptionHandler(req, res);
  } else if (req.method === 'GET') {
    await getSubscriptionsHandler(req, res);
  } else {
    res.status(404).end();
  }
};

async function addSubscriptionHandler(req, res) {
  try {
    if (!req.body || !req.body.email) {
      res.status(400).json({message: 'Invalid POST body'});
    } else {
      await addSubscription(req.body.email);
      res.status(200).json({success: true});
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

async function getSubscriptionsHandler(req, res) {
  try {
    if (!isSecure(req)) {
      res.status(400).json({message: 'Invalid token'});
    } else {
      const subscriptions = await getSubscriptions();
      res.status(200).json(subscriptions);
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

