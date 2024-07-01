import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";

import { BasePageLayout, Button } from "../../components";

import "./Pay.styles.scss";
import { PaymentSteps } from "../../components/control/PaymentSteps";

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
  // const [formValues, setFormValues] = React.useState<{
  //   creditCardNumber: string;
  //   expirationDate: string;
  //   securityCode: string;
  //   name: string;
  //   zipcode: string;
  // }>({
  //   creditCardNumber: "",
  //   expirationDate: "",
  //   securityCode: "",
  //   name: "",
  //   zipcode: "",
  // });
  const [isExpanded, setExpanded] = React.useState<boolean>(true);

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
      <div className="pay">
        <PaymentSteps isExpanded={isExpanded} setExpanded={() => setExpanded(true)}>
          <Formik
            initialValues={{
              creditCardNumber: "",
              expirationDate: "",
              securityCode: "",
              name: "",
              zipcode: "",
              maskCreditCard: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, formikHelpers) => {
              console.log("Form submitted with values:", values, formikHelpers);

              const dataToSave: any = {
                ...values,
                maskCreditCard: maskCreditCard(values.creditCardNumber),
              };

              setExpanded(false);
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <div>
                  <label htmlFor="creditCardNumber">Credit Card Number</label>
                  <Field name="creditCardNumber">
                    {({ field }: FieldProps) => (
                      <div>
                        <InputMask
                          {...field}
                          value={field.value}
                          mask="9999 9999 9999 9999"
                          maskChar="_"
                          placeholder="Enter your credit card number"
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
                    {({ field }: FieldProps) => <InputMask {...field} mask="99/99" maskChar="_" placeholder="MM/YY" />}
                  </Field>
                  <ErrorMessage name="expirationDate" component="div" />
                </div>

                <div>
                  <label htmlFor="securityCode">Security Code</label>
                  <Field name="securityCode">
                    {({ field }: FieldProps) => (
                      <InputMask {...field} mask="9999" maskChar="" placeholder="Security Code" />
                    )}
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
                    {({ field }: FieldProps) => (
                      <InputMask {...field} mask="99999" maskChar="_" placeholder="Zipcode" />
                    )}
                  </Field>
                  <ErrorMessage name="zipcode" component="div" />
                </div>

                <Button type="submit">Continue</Button>
              </Form>
            )}
          </Formik>
        </PaymentSteps>
      </div>
    </BasePageLayout>
  );
};
