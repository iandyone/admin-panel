"use client";

import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";

import { InputField } from "@/components/ui/input-field";
import { OrderData } from "@/types";
import { EOrderStatuses } from "@/types/orders";
import { editOrderValidationSchema } from "@/validations";

interface Props {
  data: OrderData;
  orderItems: string[];
  onSubmit: () => void;
  onCancel: () => void;
}

export const UpdateOrderForm: FC<Props> = ({
  data: { order, customer, location, status },
  orderItems,
  onCancel,
  onSubmit,
}) => {
  const initialValues: Partial<OrderData> = {
    order,
    customer,
    location,
    status,
  };

  return (
    <Stack direction="column" spacing={2}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={editOrderValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <Stack direction="column" spacing={2}>
              <Autocomplete
                multiple
                options={orderItems}
                value={values.order?.split(", ")}
                onChange={(_, newValue) => {
                  setFieldValue("order", newValue.join(", "));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="order"
                    label="Order"
                    error={Boolean(touched.order && errors.order)}
                  />
                )}
              />
              <InputField
                name="customer"
                label="Customer"
                type="text"
                size="medium"
                error={Boolean(touched.customer && errors.customer)}
              />

              <InputField
                name="location"
                label="Location"
                type="text"
                size="medium"
                error={Boolean(touched.location && errors.location)}
              />

              <Autocomplete
                options={Object.values(EOrderStatuses)}
                value={values.status}
                onChange={(_, newValue) => {
                  setFieldValue("status", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="status"
                    label="Status"
                    error={Boolean(touched.status && errors.status)}
                  />
                )}
              />
              <Stack direction="row" justifyContent="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  sx={{ minWidth: 100 }}
                >
                  Apply
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  color="info"
                  onClick={onCancel}
                  sx={{ minWidth: 100 }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
