import { useContext } from "react";
import { TFGContext } from "../contexts/TFGContext";

export const useTFG = () => useContext(TFGContext);