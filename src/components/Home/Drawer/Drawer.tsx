import "./Drawer.css";

import { FC, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

//Material
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Modal,
} from "@mui/material";

//Components
import AddGroupModal from "./AddGroupModal/AddGroupModal";
import axiosInstance from "../../../shared/network/axios";

const drawerWidth = 300;

export type DrawerItem = {
  id: string;
  name: string;
};

type Props = {
  //TODO Extract to context userId
  userId: string;
  groups: DrawerItem[];
  persons: DrawerItem[];
  openChat: (id: string, type: string) => void;
  refresh: () => void;
};

export const LeftDrawer: FC<Props> = ({
  userId,
  groups,
  persons,
  openChat,
  refresh,
}) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveGroup = () => {
    handleCloseModal();
    refresh();
  };

  const leaveGroup = async (groupId: string) => {
    try {
      //TODO Add leave group confirmation modal
      await axiosInstance.get(`/group/leave/${groupId}`);
      refresh();
    } catch (err) {
      console.log(err);
      throw new Error(`Group could not be left!`);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Button onClick={logout}>Log out</Button>
        <Divider />
        <List>
          <div className="flex mb-2">
            <div className="m-auto ml-2 font-bold">Groups</div>
            <div className="my-auto mx-2">
              <Button onClick={handleOpenModal} variant="contained">
                Add new group
              </Button>
            </div>
          </div>
          <Modal
            className="align-center-modal"
            open={isModalOpen}
            onClose={handleCloseModal}
          >
            <AddGroupModal
              userId={userId}
              persons={persons}
              onSave={handleSaveGroup}
            />
          </Modal>
          {groups?.map((group, index) => (
            <ListItem key={group.id} disablePadding>
              <ListItemButton>
                <ListItemText
                  onClick={() => openChat(group.id, "room")}
                  primary={group.name}
                />
                <Button
                  onClick={() => leaveGroup(group.id)}
                  variant="contained"
                >
                  Leave
                </Button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <div className="pb-2 pl-2 font-bold">Individuals</div>
          {persons?.map((person, index) => (
            <ListItem key={person.id} disablePadding>
              <ListItemButton>
                <ListItemText
                  onClick={() => openChat(person.id, "single")}
                  primary={`${person.name}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
