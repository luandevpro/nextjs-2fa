import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://gatsby-firebase-develop.firebaseio.com',
  });
} catch (err) {
  console.log('firebase initializeApp');
}

const withFirebase = (handle) => (req, res) => {
  req.admin = admin;
  return handle(req, res);
};

export default withFirebase;
