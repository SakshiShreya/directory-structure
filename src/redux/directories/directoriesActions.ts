import { IAction } from "../../interfaces/directoryInterface";
import { ADD_DIRECTORY } from "./directoriesTypes";

export const addDirectory = (directoryName: string, address: string): IAction => {
  return {
    type: ADD_DIRECTORY,
    payload: {
      name: directoryName,
      type: "directory"
    },
    address
  };
};
