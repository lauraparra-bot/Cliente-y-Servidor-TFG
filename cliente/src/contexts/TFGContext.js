import { useState, createContext, useEffect } from "react";
import TFGUserService from "../api/tfguser";
import { useAuth } from "../hooks";

export const TFGContext = createContext();

export function TFGProvider(props) {
  const { children } = props;
  const [abrir, setAbrir] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [misTFGs, setMisTFGs] = useState([]);
  const [easignado, setEAsignado] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const { getMisTFGS } = TFGUserService();
  const { user, mailToSearch, accessToken, isAdmin } = useAuth();
  const userToSearch = !isAdmin ? user?.email : mailToSearch;
  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        try {
          if (userToSearch) {
            const result = await getMisTFGS(userToSearch, accessToken);
            setMisTFGs(result.tfgusers);
            setIsLoaded(true);
            if (
              result.tfgusers &&
              result.tfgusers.some((tfg) => tfg.assigned === "asignado")
            ) {
              setEAsignado(true);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [accessToken, userToSearch, isLoaded, getMisTFGS]);

  const reloadMisTFGs = async () => {
    try {
      const result = await getMisTFGS(userToSearch, accessToken);
      setMisTFGs(result.tfgusers);
      setIsLoaded(true);
      if (
        result.tfgusers &&
        result.tfgusers.some((tfg) => tfg.assigned === "asignado")
      ) {
        setEAsignado(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutTFG = () => {
    setEAsignado(false);
    setIsLoaded(false);
    setMisTFGs([]);
  };

  const data = {
    abrir,
    setAbrir,
    message,
    setMessage,
    error,
    setError,
    misTFGs,
    setMisTFGs,
    isLoaded,
    reloadMisTFGs,
    isLoadingRequest,
    setIsLoadingRequest,
    easignado,
    logoutTFG,
  };

  return <TFGContext.Provider value={data}>{children}</TFGContext.Provider>;
}
