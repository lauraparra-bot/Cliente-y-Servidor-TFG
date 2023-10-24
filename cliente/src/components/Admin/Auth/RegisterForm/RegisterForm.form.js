import * as Yup from "yup";

export function initialValues() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
        firstname: "",
        lastname: "",
        creditos: "",
        notamedia: "",
        experiencia: "",
    };
}



export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("El email no es valido")
            .required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string()
            .required("Campo obligatorio")
            .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
        firstname: Yup.string().required("Campo obligatorio"),
        lastname: Yup.string().required("Campo obligatorio"),
        creditos: Yup.number()
            .required("Campo obligatorio")
            .test("creditos", "Debe tener 1 dígito decimal", (value) => {
                return value && value.toFixed(1) == value;
            }),
        notamedia: Yup.number()
            .required("Campo obligatorio")
            .test("notamedia", "Debe tener 2 dígitos decimales", (value) => {
                return value && value.toFixed(2) == value;
            }),
        experiencia: Yup.number().integer().required("Campo obligatorio"),
    });
}