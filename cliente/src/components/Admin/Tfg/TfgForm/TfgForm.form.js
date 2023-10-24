import * as Yup from "yup";

export function initialValues(tfg) {
    return {
        title: tfg?.title || "",
        miniature: tfg?.miniature || "",
        file: null,
        description: tfg?.description || "",
        url: tfg?.url || "",
        tutor: tfg?.tutor || "",
        tecnologias: tfg?.tecnologias || "",
        asignaturas: tfg?.asignaturas || "",
    };
}

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required(true),
        miniature: Yup.string().required(true),
        description: Yup.string().required(true),
        url: Yup.string().required(true),
        tutor: Yup.string().required(true),
        tecnologias: Yup.string().required(true),
        asignaturas: Yup.string().required(true),
    });
}