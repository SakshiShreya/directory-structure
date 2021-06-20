import { IAction, IDirectories } from "../../interfaces/directoryInterface";
import { ADD_DIRECTORY } from "./directoriesTypes";

const initialState: IDirectories = {
  name: "",
  type: "directory",
  children: []
};

function addDirectory(directory: IDirectories, path: Array<string>, newDirectory: IDirectories) {
  if (path.length === 1) {
    // this is the path where change is needed
    directory.children = [...directory.children, newDirectory];
  } else if (path.length === 0) {
    // this should never reach
    throw Error("blank path sent");
  } else {
    const child = directory.children.find(child => child.name === path[1])!;
    const newPath = [...path];
    newPath.shift();

    addDirectory(child, newPath, newDirectory);
  }
}

const directoriesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ADD_DIRECTORY:
      const newDirectory: IDirectories = { ...action.payload, children: [] };

      let path = action.address.split("/");
      if (path[0] !== "") {
        path.unshift("");
      }

      addDirectory(state, path, newDirectory);

      return state;

    default:
      return state;
  }
};

export default directoriesReducer;
