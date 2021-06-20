export interface IDirectoriesRaw {
  name: string;
  type: "directory" | "error";
}

export interface IDirectories extends IDirectoriesRaw {
  children: Array<IDirectories>;
}

export type IAction = {
  type: string;
  payload: IDirectoriesRaw;
  address: string;
};
