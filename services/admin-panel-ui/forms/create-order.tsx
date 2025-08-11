"use client";

import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useMemo } from "react";

import { InputField } from "@/components/ui/input-field";
import { orderStatusesMap } from "@/constants";
import { useCreateOrderMutation, useGetProductsQuery } from "@/query";
import { useGetEmployeeQuery } from "@/query/useGetEmployeeQuery copy";
import { CreateOrderPayload, Employee } from "@/types";
import { EOrderStatuses } from "@/types/orders";
import { editOrderValidationSchema } from "@/validations";

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
}

export const CreateOrderForm: FC<Props> = ({ onCancel, onSubmit }) => {
  const { data: employees } = useGetEmployeeQuery();
  const { data: products } = useGetProductsQuery();

  const { mutateAsync: createOrder, isPending: isSubmitting } =
    useCreateOrderMutation();

  const initialValues = {
    order: "",
    customer: "",
    location: "",
    status: "",
    deliveryman: {} as Employee,
    manager: {} as Employee,
  };

  const deliverymanOptions = useMemo(
    () => employees?.deliveryman.map(({ name }) => name) || [],
    [employees?.deliveryman],
  );

  const managersOptions = useMemo(
    () => employees?.managers.map(({ name }) => name) || [],
    [employees?.managers],
  );

  const productsOptions = useMemo(
    () => products?.map(({ name }) => name) || [],
    [products],
  );

  const handleOnSubmit = async (values: typeof initialValues) => {
    const { customer, deliveryman, manager, location, order, status } = values;

    const orderItems = order.split(", ");
    const productsIds = products
      ?.filter(({ name }) => orderItems.includes(name))
      .map(({ id }) => id);

    const payload: CreateOrderPayload = {
      customer,
      location,
      status: orderStatusesMap[
        status.toLowerCase()
      ].toUpperCase() as EOrderStatuses,
      deliverymanId: deliveryman.id,
      managerId: manager.id,
      productsIds: productsIds || [],
    };

    await createOrder(payload);

    onSubmit();
  };

  return (
    <Stack direction="column" spacing={2}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={editOrderValidationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <Stack direction="column" spacing={2}>
              <Autocomplete
                multiple
                options={productsOptions}
                value={values.order ? values.order.split(", ") : []}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
                error={Boolean(touched.customer && errors.customer)}
              />

              <InputField
                name="location"
                label="Location"
                type="text"
                size="medium"
                disabled={isSubmitting}
                error={Boolean(touched.location && errors.location)}
              />

              <Autocomplete
                options={deliverymanOptions}
                value={values.deliveryman.name || ""}
                disabled={isSubmitting}
                onChange={(_, newValue) => {
                  setFieldValue(
                    "deliveryman",
                    newValue
                      ? employees?.deliveryman.find(
                          ({ name }) => name === newValue,
                        )
                      : "",
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="deliveryman"
                    label="Deliveryman"
                    error={Boolean(touched.deliveryman && errors.deliveryman)}
                  />
                )}
              />

              <Autocomplete
                options={managersOptions}
                value={values.manager.name || ""}
                disabled={isSubmitting}
                onChange={(_, newValue) => {
                  setFieldValue(
                    "manager",
                    newValue
                      ? employees?.managers.find(
                          ({ name }) => name === newValue,
                        )
                      : "",
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="manager"
                    label="Manager"
                    error={Boolean(touched.manager && errors.manager)}
                  />
                )}
              />

              <Autocomplete
                options={Object.values(EOrderStatuses)}
                value={values.status}
                disabled={isSubmitting}
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
               <Stack direction='row' spacing={2}>
                  <Button
                    type="reset"
                    variant="contained"
                    color="info"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    sx={{ minWidth: 100 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    color="error"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    sx={{ minWidth: 100 }}
                  >
                    Delete
                  </Button>
               </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  disabled={isSubmitting}
                  sx={{ minWidth: 100 }}
                >
                  Apply
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
