import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './LoginPage.module.css';
import { login } from '../../redux/auth/operations';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required field'),
  password: Yup.string()
    .required('Required field')
    .min(6, 'Minimum 6 characters'),
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.loginForm}>
          <div className={css.fieldWrapper}>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>
          <div className={css.fieldWrapper}>
            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
