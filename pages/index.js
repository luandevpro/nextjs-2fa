<<<<<<< HEAD
=======
import { useEffect } from 'react';
>>>>>>> api routes v9 auth firebase admin
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import FormWizard from '../components/FormWizard';
import { withRedux } from '../lib/withRedux';
import Email from '../components/Email';
import ValidateEmail from '../components/ValidateEmail';
import Final from '../components/Final';
import * as actions from '../actions';
import { auth, providerGoogle } from '../lib/firebase';

function Index() {
  const activeStep = useSelector((state) => state.activeStep);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    if (activeStep === 0) {
      Axios({
        url: '/api/totp/create',
        method: 'post',
        data: values,
        headers: {
          'Content-Type': 'application/javascript',
        },
      })
        .then(({ data }) => {
          if (data.secret) {
            localStorage.setItem('secret', data.secret);
            dispatch(actions.activeStep());
          }
        })
        .catch((err) => console.log(err));
    }
    if (activeStep === 1) {
      Axios({
        url: '/api/totp/validate',
        method: 'post',
        data: {
          secret: localStorage.getItem('secret'),
          token: values.number,
        },
        headers: {
          'Content-Type': 'application/javascript',
        },
      })
        .then(({ data }) => {
          if (data.valid) {
            dispatch(actions.activeStep());
          } else {
            dispatch(actions.errorValidate('Token không chính xác'));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAuth = () => {
    auth.signInWithPopup(providerGoogle).then((result) => {
      console.log(result);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser.getIdToken(true).then((token) => {
          Axios({
            url: '/api/user/getUser',
            method: 'GET',
            data: null,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(({ data }) => {
            console.log(data);
          });
        });
      }
    });
  }, []);
  return (
    <div className="container mt-5">
      <button type="button" className="mt-5 mb-5 btn btn-primary" onClick={handleAuth}>
        Google
      </button>
      <Formik initialValues={{ email: '', number: '' }} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <FormWizard>
              <Email props={props} />
              <ValidateEmail props={props} />
              <Final props={props} />
            </FormWizard>
            {activeStep < 2 && (
              <button type="submit" className="btn btn-primary mt-5">
                Next
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default withRedux(Index);
