import app from "./../base";

import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required(),
});

const TeacherForm = (props) => {
  const onClose = () => {
    props.onClose();
  };

  const create = async (data) => {
    const db = app.firestore();
    await db.collection("teachers").add({
      ...data,
      createdAt: new Date(),
    });
  };

  const update = async (data) => {
    const { id, createdAt, updatedAt, ...rest } = data;
    const db = app.firestore();
    await db
      .collection("teachers")
      .doc(id)
      .update({
        ...rest,
        updatedAt: new Date(),
      });
  };

  return (
    <Box>
      <Formik
        initialValues={props.data ? props.data : { name: "" }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          props.data ? update(data) : create(data);
          onClose();
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="flex-start" spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  type="text"
                  label="Name"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.name}
                  error={!!errors.name}
                  fullWidth
                />
              </Grid>
              <Grid item container xs={12} justify="flex-end">
                <Box mr={1}>
                  <Button onClick={onClose} color="secondary">
                    Cancel
                  </Button>
                </Box>
                <Button disabled={isSubmitting} color="primary" type="submit">
                  {props.data ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TeacherForm;