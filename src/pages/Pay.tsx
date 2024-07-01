import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";

import { BasePageLayout } from "../components";

const validationSchema = Yup.object({
  creditCardNumber: Yup.string()
    .required("Credit Card Number is required")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid credit card number format")
    .test("luhn-algorithm", "Invalid credit card number", (value) => {
      // *STOLEN* credit goes to  - https://gist.github.com/DiegoSalazar/4075533#file-validate_credit_card-js-L2
      if (/[^0-9-\s]+/.test(value)) return false;

      let nCheck = 0,
        bEven = false;
      value = value.replace(/\D/g, "");

      for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
          nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
      }

      return nCheck % 10 == 0;
    }),
  expirationDate: Yup.string()
    .required("Expiration Date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date")
    .test("is-future-date", "Expiration date must be in the future", (value) => {
      if (!value) return false;

      const today = new Date();
      const [month, year] = value.split("/").map((part) => parseInt(part, 10));

      // Add 2000 to year to handle 'yy' format correctly, assuming dates are from 2000 to 2099
      const fullYear = 2000 + year;
      const expiration = new Date(fullYear, month - 1);

      // Compare year and month for future date validation
      return fullYear > today.getFullYear() || (fullYear === today.getFullYear() && month > today.getMonth() + 1);
    }),
  securityCode: Yup.string()
    .required("Security Code is required")
    .matches(/^\d{3,4}$/, "Invalid security code"),
  name: Yup.string().required("Name is required"),
  zipcode: Yup.string()
    .required("Zipcode is required")
    .matches(/^\d{5}$/, "Invalid zipcode"),
});

export const Pay: React.FC = () => {
  const inputRef = useRef();

  const maskCreditCard = (creditCardNumber: string) => {
    if (creditCardNumber.length < 4) {
      return creditCardNumber;
    }
    const visibleDigits = creditCardNumber.slice(-4);
    const maskedDigits = "****"; // Display 4 asterisks
    return maskedDigits + visibleDigits;
  };

  return (
    <BasePageLayout>
      <Formik
        initialValues={{
          creditCardNumber: "",
          expirationDate: "",
          securityCode: "",
          name: "",
          zipcode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // if (!isValid) {
          //   return;
          // }

          console.log("Form submitted with values:", values);

          const dataToSave = {
            ...values,
            maskCreditCard: maskCreditCard(values.creditCardNumber),
          };

          localStorage.setItem("formData", JSON.stringify(dataToSave));
        }}
      >
        {({ handleSubmit, touched, errors, validateField, setFieldTouched }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="creditCardNumber">Credit Card Number</label>
              <Field name="creditCardNumber">
                {({ field }: any) => (
                  <div>
                    <InputMask
                      ref={inputRef}
                      {...field}
                      mask="9999 9999 9999 9999"
                      maskChar="_"
                      placeholder="Enter your credit card number"
                      onChange={(e) => {
                        field.onChange(e);
                        // setFieldTouched("creditCardNumber", true, false);
                        // validateField("creditCardNumber");
                      }}
                    />
                    {touched.creditCardNumber && !errors.creditCardNumber ? (
                      <span style={{ color: "green", marginLeft: "10px" }}>✓</span>
                    ) : touched.creditCardNumber && errors.creditCardNumber ? (
                      <span style={{ color: "red", marginLeft: "10px" }}>✗</span>
                    ) : null}
                    <ErrorMessage name="creditCardNumber" component="div" />
                  </div>
                )}
              </Field>
            </div>

            <div>
              <label htmlFor="expirationDate">Expiration Date</label>
              <Field name="expirationDate">
                {({ field }: any) => <InputMask {...field} mask="99/99" maskChar="_" placeholder="MM/YY" />}
              </Field>
              <ErrorMessage name="expirationDate" component="div" />
            </div>

            <div>
              <label htmlFor="securityCode">Security Code</label>
              <Field name="securityCode">
                {({ field }: any) => <InputMask {...field} mask="9999" maskChar="" placeholder="Security Code" />}
              </Field>
              <ErrorMessage name="securityCode" component="div" />
            </div>

            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="zipcode">Zipcode</label>
              <Field name="zipcode">
                {({ field }: any) => <InputMask {...field} mask="99999" maskChar="_" placeholder="Zipcode" />}
              </Field>
              <ErrorMessage name="zipcode" component="div" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </BasePageLayout>
  );
};
