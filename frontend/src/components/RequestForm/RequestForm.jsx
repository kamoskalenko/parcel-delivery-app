import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

import s from './RequestForm.module.css';
import { ParcelTypeOptions } from '../../constants/parcelTypes';

const validationSchema = Yup.object({
  fromCity: Yup.string()
    .min(2, 'At least 2 characters')
    .required('Origin city is required'),
  toCity: Yup.string()
    .min(2, 'At least 2 characters')
    .required('Destination city is required'),
  parcelType: Yup.string().required('Please select a parcel type'),
  dispatchDate: Yup.date()
    .min(new Date(), 'Dispatch date cannot be in the past')
    .required('Dispatch date is required'),
  parcelDescription: Yup.string()
    .min(5, 'At least 5 characters')
    .max(30, 'Maximum 30 characters')
    .required('Parcel description is required'),
});

const RequestForm = ({ onSubmit, initialValues }) => {
  const [fromCountryId, setFromCountryId] = useState(null);
  const [fromStateId, setFromStateId] = useState(null);
  const [toCountryId, setToCountryId] = useState(null);
  const [toStateId, setToStateId] = useState(null);

  return (
    <Formik
      initialValues={
        initialValues || {
          fromCity: '',
          toCity: '',
          parcelType: '',
          dispatchDate: new Date(),
          parcelDescription: '',
        }
      }
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ setFieldValue, values, isValid, dirty }) => (
        <Form className={s.form}>
          <h4>
            From:<span className={s.required}>*</span>
          </h4>
          <CountrySelect
            onChange={(e) => setFromCountryId(e.id)}
            placeHolder="Select country"
          />
          <StateSelect
            countryid={fromCountryId}
            onChange={(e) => setFromStateId(e.id)}
            placeHolder="Select region"
          />
          <CitySelect
            countryid={fromCountryId}
            stateid={fromStateId}
            onChange={(e) => setFieldValue('fromCity', e.name)}
            placeHolder="Origin city"
          />
          <ErrorMessage name="fromCity" component="div" className={s.error} />

          <h4>
            To:<span className={s.required}>*</span>
          </h4>
          <CountrySelect
            onChange={(e) => setToCountryId(e.id)}
            placeHolder="Select country"
          />
          <StateSelect
            countryid={toCountryId}
            onChange={(e) => setToStateId(e.id)}
            placeHolder="Select region"
          />
          <CitySelect
            countryid={toCountryId}
            stateid={toStateId}
            onChange={(e) => setFieldValue('toCity', e.name)}
            placeHolder="Destination city"
          />
          <ErrorMessage name="toCity" component="div" className={s.error} />

          <label htmlFor="parcelType">
            Parcel type:<span className={s.required}>*</span>
          </label>
          <Field
            as="select"
            name="parcelType"
            id="parcelType"
            aria-label="Parcel type"
          >
            {ParcelTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Field>
          <ErrorMessage name="parcelType" component="div" className={s.error} />

          <label htmlFor="dispatchDate">
            Dispatch date:<span className={s.required}>*</span>
          </label>
          <DatePicker
            selected={values.dispatchDate}
            onChange={(date) => setFieldValue('dispatchDate', date)}
            minDate={new Date()}
            id="dispatchDate"
            name="dispatchDate"
            className={s.datepicker}
            aria-label="Dispatch date"
          />
          <ErrorMessage
            name="dispatchDate"
            component="div"
            className={s.error}
          />

          <label htmlFor="parcelDescription">
            Parcel description:<span className={s.required}>*</span>
          </label>
          <Field
            as="textarea"
            name="parcelDescription"
            id="parcelDescription"
            rows="4"
            placeholder="Enter parcel description"
            aria-label="Parcel description"
          />
          <ErrorMessage
            name="parcelDescription"
            component="div"
            className={s.error}
          />

          <button
            type="submit"
            className={s.submit}
            disabled={!(isValid && dirty)}
          >
            Submit request
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RequestForm;
