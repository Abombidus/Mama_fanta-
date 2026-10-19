import { AppContext } from "./AppContext";
import { Devices } from "../info/Data";

const ContextProvider = (props) => {
  Devices;
  return (
    <AppContext.Provider value={Devices}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
