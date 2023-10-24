import React, { useCallback } from 'react'
import { Form, Image } from "semantic-ui-react";
import { useFormik } from 'formik';
import { useDropzone } from "react-dropzone";
import { image } from "../../../../assets";
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ENV } from '../../../../utils';
import { initialValues, validationSchema } from './UserForm.form';
import "./UserForm.scss";

const userController = new User();

export function UserForm(props) {
    const { close, onReload, user } = props;
    const { accessToken } = useAuth();

    const { user: { role }, } = useAuth();
    const isAdmin = role === "admin";


    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!user) {
                    await userController.createUser(accessToken, formValue);
                } else {
                    await userController.updateUser(accessToken, user._id, formValue);
                }

                onReload();
                close();
            } catch (error) {
                console.error(error);
            }
        },
    });

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("avatar", URL.createObjectURL(file));
        formik.setFieldValue("fileAvatar", file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    });

    const getAvatar = () => {
        if (formik.values.fileAvatar) {
            return formik.values.avatar;
        } else if (formik.values.avatar) {
            return `${formik.values.avatar}`;
        }
        return image.noAvatar;
    }

    return (
        <Form className='user-form' onSubmit={formik.handleSubmit}>
            <div className='user-form__avatar' {...getRootProps()}>
                <input {...getInputProps()} />
                <Image avatar size="small" src={getAvatar()} />
            </div>

            <Form.Group widths="equal">
                <Form.Field>
                    <label>Nombre</label>
                    <Form.Input name="firstname" placeholder="Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname} />
                </Form.Field>
                <Form.Field>
                    <label>Apellidos</label>
                    <Form.Input name="lastname" placeholder="Apellidos" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname} />
                </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Field>
                    <label>Correo electrónico</label>
                    <Form.Input name="email" placeholder="Correo electrónico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
                </Form.Field>
                {isAdmin && (
                    <Form.Field>
                        <label>Rol</label>
                        <Form.Dropdown placeholder='Selecciona un rol' options={roleOptions} selection onChange={(_, data) => formik.setFieldValue("role", data.value)} value={formik.values.role} error={formik.errors.role} />
                    </Form.Field>
                )}
            </Form.Group>

            <Form.Field>
                <label>Créditos restantes para finalizar</label>
                <Form.Input name="creditos" placeholder="Incluyendo el TFG. Ej: 35.5" onChange={formik.handleChange} value={formik.values.creditos} error={formik.errors.creditos} />
            </Form.Field>
            <Form.Field>
                <label>Media expediente académico</label>
                <Form.Input name="notamedia" placeholder="Ej 8.66" onChange={formik.handleChange} value={formik.values.notamedia} error={formik.errors.notamedia} />
            </Form.Field>
            <Form.Field>
                <label>Total Meses experiencia profesional</label>
                <Form.Input name="experiencia" placeholder="Total Meses experiencia profesional" onChange={formik.handleChange} value={formik.values.experiencia} error={formik.errors.experiencia} />
            </Form.Field>
            <Form.Field>
                <label>Contraseña</label>
                <Form.Input type='password' name="password" placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />
            </Form.Field>

            <Form.Button color='purple' type='submit' fluid loading={formik.isSubmitting}>
                {user ? "Actualizar usuario" : "Crear usuario"}
            </Form.Button>
        </Form>

    );
}






const roleOptions = [
    {
        key: "user",
        text: "Usuario",
        value: "user",
    },
    {
        key: "admin",
        text: "Administrador",
        value: "admin",
    },
];
