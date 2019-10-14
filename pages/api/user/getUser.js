import Cookies from 'cookies';
import withFirebase from '../../../middlewares/withFirebase';

async function handle(req, res) {
  const cookies = new Cookies(req, res, { keys: ['hehe'] });
  const idToken = req.cookies.token || req.headers.authorization.split(' ')[1];
  if (idToken) {
    const expiresIn = 7 * 60 * 60 * 1000;
    req.admin
      .auth()
      .verifyIdToken(idToken, true)
      .then(() => {
        req.admin
          .auth()
          .createSessionCookie(idToken, { expiresIn })
          .then(async (sessionCookie) => {
            cookies.set('token', sessionCookie, {
              maxAge: expiresIn,
              httpOnly: true,
            });
            res.json({ token: sessionCookie });
          });
      })
      .catch(() => {
        res.status(401).json({ message: 'Not authorized! Go back!!!' });
      });
  } else {
    res.status(401).json({ message: 'Not authorized! Go back!!!' });
  }
}
export default withFirebase(handle);
