import { FC } from "react";

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
} from "@mui/material";

const drawerWidth = 300;

type DrawerItem = {
  id: string;
  name: string;
};

type Props = {
  groups: DrawerItem[];
  persons: DrawerItem[];
  openChat: (id: string, type: string) => void;
};

export const LeftDrawer: FC<Props> = ({ groups, persons, openChat }) => {
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
        <Divider />
        <List>
          <div className="flex">
            <div className="m-auto font-bold">Groups</div>
            <Button className="mt-auto mb-auto mr-1 ml-1">Add new group</Button>
          </div>
          {groups?.map((group, index) => (
            <ListItem key={group.id} disablePadding>
              <ListItemButton>
                <ListItemText
                  onClick={() => openChat(group.id, "group")}
                  primary={group.name}
                />
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
