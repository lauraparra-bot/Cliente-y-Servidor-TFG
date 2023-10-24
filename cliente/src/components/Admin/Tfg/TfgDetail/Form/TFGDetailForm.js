import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { useAuth } from "../../../../../hooks";
import { useState } from "react";
import { validationSchema } from "./TFGDetailFormValidations.form";
import PuntosExperienciaONotaMedia from "./Utils/CalculatePoint";
import TFGUserService from "../../../../../api/tfguser";
import { useTFG } from "../../../../../hooks/useTFG";
import SelectOptions from "./Components/SelectOptions";
import { GetMaxPrio } from "./Utils/GetMaxPrio";

const TFGDetailForm = ({ tfg, setOpen }) => {
  const { user, accessToken } = useAuth();
  const { setAbrir, setMessage, setError, reloadMisTFGs, misTFGs, easignado } = useTFG();
  
  const titulo = tfg.title ?? tfg.titleTFG;
  const thisTFG = misTFGs.filter((tfgu) => tfgu.titleTFG === titulo)[0];
  const { creditos, notamedia } = user;
  const [habNotaMedia, setHabNotaMedia] = useState(
    thisTFG?.SelectedMethod === "notaMed"
  );
  const { createTempTfgUser, updateTempTfgUser } = TFGUserService();
  const formik = useFormik({
    initialValues: {
      expProfIn: thisTFG?.SelectedMethod === "expPro" ? thisTFG?.Experience : 0,
      notaMediaIn:
        thisTFG?.SelectedMethod === "notaMed" ? thisTFG?.AvgRating : 0,
      notaExp: thisTFG?.SelectedMethod ?? "notaMed",
      priorities: thisTFG?.Priority ?? 0,
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      const { notaMediaIn, expProfIn, notaExp } = formValues;
      try {
        const puntos = PuntosExperienciaONotaMedia(
          notaMediaIn,
          expProfIn,
          notaExp,
          creditos,
          notamedia
        );

        const data = {
          titleTFG: tfg.title,
          assignedMailUser: user.email,
          active: true,
          assigned: "asignadotemporal",
          Points: puntos,
          Experience: expProfIn,
          AvgRating: notaMediaIn,
          SelectedMethod: notaExp,
        };

        setOpen(false);
        let result;

        if (thisTFG?.Priority) {
          data.Priority = formValues.priorities;
          result = await updateTempTfgUser(accessToken, data);
          result.creado = true;
        } else {
          result = await createTempTfgUser(accessToken, data);
        }

        if (result.creado === true) {
          await reloadMisTFGs();
          // mostrar el modal con el mensaje de creado correcto
          setError(false);
          setAbrir(true);
          setMessage(result.msg);
        } else {
          // mostrar el error en el modal
          setError(true);
          setAbrir(true);
          setMessage(result.msg);
        }
      } catch (err) {
        setError(true);
        setAbrir(true);
        setMessage("Ha ocurrido un error al tratar de asignar el TFG " + err);
      }
    },
  });

  const handleRadioButtons = (e) => {
    formik.values.notaExp = e.target.value;
    if (formik.values.notaExp === "notaMed") {
      setHabNotaMedia(true);
    } else {
      setHabNotaMedia(false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Field> </Form.Field>
      {thisTFG?.Priority && (
        <Form.Field>
          <strong>Selecciona tu prioridad:</strong>
          <SelectOptions
            name="priorities"
            onChange={formik.handleChange}
            value={formik.values.priorities}
            maxPrio={GetMaxPrio(misTFGs)}
          />
        </Form.Field>
      )}
      <Form.Field>
        <label htmlFor="expPro">
          <input
            type="radio"
            id="expPro"
            name="group"
            value="expPro"
            onChange={(e) => handleRadioButtons(e)}
            style={{ marginRight: 2 }}
            checked={!habNotaMedia}
            disabled={easignado}
          />
          Ingresa tu experiencia profesional en meses
        </label>
        <Form.Input
          name="expProfIn"
          type="number"
          min="1"
          onChange={formik.handleChange}
          value={formik.values.expProfIn}
          error={formik.errors.expProfIn}
          disabled={habNotaMedia || easignado}
        ></Form.Input>
      </Form.Field>
      <Form.Field>
        <label htmlFor="two">
          <input
            type="radio"
            id="notaMed"
            name="group"
            value="notaMed"
            onChange={(e) => handleRadioButtons(e)}
            style={{ marginRight: 2 }}
            checked={habNotaMedia}
            disabled={easignado}
          />
          Ingresa tu nota media de las asignaturas del TFG
        </label>
        <Form.Input
          name="notaMediaIn"
          type="number"
          min="0"
          max="10"
          onChange={formik.handleChange}
          value={formik.values.notaMediaIn}
          error={formik.errors.notaMediaIn}
          disabled={!habNotaMedia || easignado}
        ></Form.Input>
      </Form.Field>
      <Form.Button color="blue" type="submit" loading={formik.isSubmitting} disabled={easignado}>
        {thisTFG?.Priority ? <>Actualizar</> : <>Apuntate</>}
      </Form.Button>
    </Form>
  );
};

export default TFGDetailForm;
