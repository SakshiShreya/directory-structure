import * as React from "react";
import { useSelector } from "react-redux";
import AddDirectoriesForm from "../addDirectoriesForm/AddDirectoriesForm";
import { Link, useParams } from "react-router-dom";
import { IDirectories } from "../../interfaces/directoryInterface";
import { Button, Modal, List, Card, Divider, Header, Segment, Icon } from "semantic-ui-react";
import { findCurrentDirectory } from "../../utils/findCurrentDirectory";
import styles from "./DirectoriesScreen.module.scss";

export interface DirectoriesScreenProps {}

const DirectoriesScreen: React.FC<DirectoriesScreenProps> = () => {
  const params = useParams<{ 0: string }>();
  const directories: IDirectories = useSelector<IDirectories, IDirectories>(state => findCurrentDirectory(state, params[0]));

  const [showPopup, setShowPopup] = React.useState(false);

  const currentPath = params[0].slice(process.env.PUBLIC_URL.length).split("/");

  function back() {
    const backPath = [...currentPath];
    backPath.pop();
    return process.env.PUBLIC_URL + "/" + backPath.join("/");
  }

  return (
    <div className={styles.cont}>
      <Card fluid>
        {directories.type === "directory" && (
          <Card.Content>
            <Header as="h1">{directories.name || "ROOT"}</Header>

            {directories.name && (
              <Link to={back()} className={styles.back_button}>
                Back
              </Link>
            )}
            <Modal
              size="tiny"
              open={showPopup}
              trigger={<Button primary>New Directory</Button>}
              onOpen={() => setShowPopup(true)}
              onClose={() => setShowPopup(false)}
            >
              <Modal.Header>New Directory</Modal.Header>
              <Modal.Content>
                <AddDirectoriesForm onClose={() => setShowPopup(false)} />
              </Modal.Content>
            </Modal>

            <Divider />

            <List relaxed>
              {directories.children.map(child => (
                <List.Item key={child.name}>
                  <List.Icon name="folder" />
                  <List.Content>
                    <Link to={(process.env.PUBLIC_URL + (directories.name === "" ? "" : "/")) + [...currentPath, child.name].join("/")} className={styles.link}>
                      {child.name}
                    </Link>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Card.Content>
        )}
        {directories.type === "error" && (
          <Segment placeholder>
            <Header icon>
              <Icon name="file pdf outline" />
              {directories.name}
            </Header>
            <Segment.Inline>
              <Link to="/" className={styles.back_button}>
                Back
              </Link>
            </Segment.Inline>
          </Segment>
        )}
      </Card>
    </div>
  );
};

export default DirectoriesScreen;
