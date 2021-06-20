import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addDirectory } from "../../redux/directories/directoriesActions";
import { Input, Button, Form, Label } from "semantic-ui-react";
import styles from "./AddDirectoriesForm.module.scss";
import { IDirectories } from "../../interfaces/directoryInterface";
import { findCurrentDirectory } from "../../utils/findCurrentDirectory";

export interface AddDirectoriesFormProps {
  onClose: () => void;
}

const AddDirectoriesForm: React.FC<AddDirectoriesFormProps> = props => {
  const dispatch = useDispatch();
  const [newDirectory, setNewDirectory] = React.useState("");
  const [error, setError] = React.useState("");
  const params = useParams<{ 0: string }>();
  const directories: IDirectories = useSelector<IDirectories, IDirectories>(state => findCurrentDirectory(state, params[0]));

  function submitForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    // validation
    if (directories.children.find(child => child.name === newDirectory)) {
      setError("This directory name already exists.");
    } else {
      dispatch(addDirectory(newDirectory, params["0"]));
      props.onClose();
    }
  }

  function handleNewDirectoryChange(val: string) {
    error && setError("");
    setNewDirectory(val);
  }

  return (
    <Form>
      <div className={styles.input_cont}>
        <label htmlFor="name" className={styles.label}>
          Directory Name
        </label>
        <Form.Field>
          <Input onChange={(_, data) => handleNewDirectoryChange(data.value)} placeholder="Eg. Folder_1" id="name" fluid />
          {error && (
            <Label basic color="red" pointing>
              {error}
            </Label>
          )}
        </Form.Field>
      </div>
      <Button type="submit" onClick={submitForm} primary disabled={!newDirectory}>
        Submit
      </Button>
      <Button type="button" onClick={props.onClose}>
        Cancel
      </Button>
    </Form>
  );
};

export default AddDirectoriesForm;
