import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './RegistrationPage.module.css';
import { register } from '../../redux/auth/operations';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required field')
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters'),
  email: Yup.string().email('Invalid email').required('Required field'),
  password: Yup.string()
    .required('Required field')
    .min(6, 'Minimum 6 characters'),
});

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.registrationForm}>
          <div className={css.fieldWrapper}>
            <label>Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>
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
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationPage;
