import { IDirectories } from "../interfaces/directoryInterface";

export function findCurrentDirectory(state: IDirectories, params: string) {
  let path = params.split("/");
  // remove blank string from beginning

  if (path[0] === "") {
    path.shift();
  }

  if (path.length === 0) {
    return state;
  } else {
    let newState: IDirectories = JSON.parse(JSON.stringify(state));

    for (let p of path) {
      newState = newState.children.find(child => child.name === p) || {
        type: "error",
        name: "This directory does not exist",
        children: []
      };
    }

    return newState;
  }
}