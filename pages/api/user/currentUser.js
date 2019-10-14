import withFirebase from '../../../middlewares/withFirebase';

async function handle(req, res) {
  const idToken = req.cookies.token;
  if (idToken) {
    req.admin
      .auth()
      .verifySessionCookie(req.cookies.token, true)
      .then((decodedClaims) => {
        res.json({ token: decodedClaims });
      })
      .catch(() => {
        res.status(401).json({ message: 'Not authorized! Go back!!!' });
      });
  } else {
    res.status(401).json({ message: 'Not authorized! Go back!!!' });
  }
}
export default withFirebase(handle);
