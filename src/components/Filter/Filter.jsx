import css from './Filter.module.css';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import notify from 'utils/alert';

const Filter = ({ name, onFilterChange }) => {
  let scima = yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/),
  });
  // const handleSubmit = (values, { resetForm }) => {
  //   console.log(values);
  // };
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={val => {}}
      validationSchema={scima}
    >
      {({ handleChange }) => (
        <Form className={css.filterForm}>
          <label className={css.filterFormLabel}>
            <span className={css.filterFormLabelText}>
              Find contacts by name
            </span>

            <Field
              className={css.filterFormInput}
              type="text"
              name="name"
              // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              placeholder="Name"
              onChange={handleChange}
            />
            <ErrorMessage component={notify('warning-name')} name="name" />
          </label>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
