import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FC } from "react";

const drawerWidth = 240;

type DrawerItem = {
  id: string;
  name: string;
};

type Props = {
  groups: DrawerItem[];
  persons: DrawerItem[];
};

export const LeftDrawer: FC<Props> = ({ groups, persons }) => {
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
          <div className="pb-2 pl-2 font-bold">Groups</div>
          {groups?.map((group, index) => (
            <ListItem key={group.id} disablePadding>
              <ListItemButton>
                <ListItemText primary={group.name} />
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
                <ListItemText primary={`${person.name}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};