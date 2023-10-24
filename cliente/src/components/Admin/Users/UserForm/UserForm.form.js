import * as Yup from "yup";

export function initialValues(user) {
    return {
        avatar: user?.avatar || "",
        fileAvatar: null,
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        role: user?.role || "",
        creditos: user?.creditos || "",
        notamedia: user?.notamedia || "",
        experiencia: user?.experiencia || "",
        password: "",
    };
}


export function validationSchema(user) {
    return Yup.object({
        firstname: Yup.string().required(true),
        lastname: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        role: Yup.string().required(true),
        password: user ? Yup.string() : Yup.string().required(true),
        creditos: Yup.number()
            .required(true)
            .test("creditos", "Debe tener 1 dígito decimal", (value) => {
                return value && value.toFixed(1) == value;
            }),
        notamedia: Yup.number()
            .required(true)
            .test("notamedia", "Debe tener 2 dígitos decimales", (value) => {
                return value && value.toFixed(2) == value;
            }),
        experiencia: Yup.number().integer().required(true),
    });
}

