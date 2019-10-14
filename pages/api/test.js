import withFirebase from '../../middlewares/withFirebase';
import cookies from '../../middlewares/cookies';

async function handle(req, res) {
  if (req.method === 'GET') {
    res.cookie('token', 'api-middleware!', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ user: 'no' });
  } else {
    res.json({ user: 'no' });
  }
}

export default withFirebase(cookies(handle));
