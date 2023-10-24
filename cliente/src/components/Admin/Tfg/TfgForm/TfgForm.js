import React, { useCallback } from 'react'
import { Form, Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { Tfg } from '../../../../api';
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
import { initialValues, validationSchema } from './TfgForm.form';
import "./TfgForm.scss"

const tfgController = new Tfg();

export function TfgForm(props) {
    const { onClose, onReload, tfg } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(tfg),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!tfg) {
                    await tfgController.createTfg(accessToken, formValue);
                } else {
                    await tfgController.updateTfg(accessToken, tfg._id, formValue);
                }


                onReload();
                onClose();

            } catch (error) {
                console.error(error);
            }
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    });

    const getMiniature = () => {
        if (formik.values.file) {
            return formik.values.miniature;
        } else if (formik.values.miniature) {
            return `${formik.values.miniature}`;
        }
        return null;
    };
    return (
        <Form className='tfg-form' onSubmit={formik.handleSubmit}>
            <div className='tfg-form__miniature' {...getRootProps()}>
                <input {...getInputProps()} />
                {getMiniature() ? (
                    <Image size='small' src={getMiniature()} />
                ) : (
                    <div>
                        <span>Arrastra tu miniatura</span>
                    </div>
                )}
            </div>

            <Form.Input name="title" placeholder="Nombre del TFG" onChange={formik.handleChange} value={formik.values.title} error={formik.errors.title} />
            <Form.Input name='url' placeholder="Link" onChange={formik.handleChange} value={formik.values.url} error={formik.errors.url} />
            <Form.TextArea name='description' placeholder="Descripción del TFG" onChange={formik.handleChange} value={formik.values.description} error={formik.errors.description} />
            <Form.Input name='tutor' placeholder="Nombre del tutor" onChange={formik.handleChange} value={formik.values.tutor} error={formik.errors.tutor} />
            <Form.Input name='tecnologias' placeholder="Tecnologías" onChange={formik.handleChange} value={formik.values.tecnologias} error={formik.errors.tecnologias} />
            <Form.Input name='asignaturas' placeholder="Asignaturas" onChange={formik.handleChange} value={formik.values.asignaturas} error={formik.errors.asignaturas} />

            <Form.Button color='purple' type='submit' fluid loading={formik.isSubmitting}>
                {!tfg ? "Crear TFG" : "Actualizar TFG"}
            </Form.Button>


        </Form>
    )
}
