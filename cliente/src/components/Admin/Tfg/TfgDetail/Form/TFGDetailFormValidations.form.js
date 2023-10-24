import * as Yup from 'yup';

export const validationSchema = () => {
    return Yup.object({
        notaMediaIn: Yup.number().required(false),
        expProfIn: Yup.number().required(false)
    });
};