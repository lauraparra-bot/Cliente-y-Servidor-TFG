import React, { useState } from 'react'
import { Form } from "semantic-ui-react";
import { useFormik } from 'formik';
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from './RegisterForm.form';
import "./RegisterForm.scss";
import { Await } from 'react-router-dom';

const authController = new Auth();

export function RegisterForm(props) {
  const { openLogin } = props;
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await authController.register(formValue);
        openLogin();
      } catch (error) {
        setError("Error en el servidor")
      }
    },
  });

  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
      <Form.Input name="firstname" placeholder="Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname} />
      <Form.Input name="lastname" placeholder="Apellidos" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname} />
      <Form.Input name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
      <Form.Input name="password" type='password' placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />
      <Form.Input name="repeatPassword" type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword} />
      <Form.Input name="creditos" placeholder="Créditos restantes para finalizar (Incluyendo el TFG. Ej: 35.5) " onChange={formik.handleChange} value={formik.values.creditos} error={formik.errors.creditos} />
      <Form.Input name="notamedia" placeholder="Media expediente académico (Ej 8.66)" onChange={formik.handleChange} value={formik.values.notamedia} error={formik.errors.notamedia} />
      <Form.Input name="experiencia" placeholder="Total Meses experiencia profesional" onChange={formik.handleChange} value={formik.values.experiencia} error={formik.errors.experiencia} />

      <Form.Button inverted color='violet' type='submit' fluid loading={formik.isSubmitting}>
        Crear cuenta
      </Form.Button>

      <p className='register-form__error'>{error}</p>
    </Form>
  );
}
