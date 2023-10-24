import Priorities from "../Utils/Priorities";
import { useTFG } from "../../../../../../hooks/useTFG";

export default function SelectOptions(props) {

  const {easignado} = useTFG();
  return (
    <select name={props.name} onChange={props.onChange} value={props.value} disabled={easignado}>
      {Priorities.filter(p => p.key <= props.maxPrio).map((prio) => {
        return (
          <option key={prio.key} value={prio.value} label={prio.text}>
            {prio.text}
          </option>
        );
      })}
    </select>
  );
}
