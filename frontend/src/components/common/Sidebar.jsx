import { Button, Drawer, List, Stack, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import userData from "../../configs/helpers";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const info = userData();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/").then(()=>{
       window.location.reload();
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <AccountBoxIcon />
            {info.name ?? ""}
          </Stack>
        </Toolbar>
        {info &&
          appRoutes
            ?.filter((r) => r.role == info.role)
            .map((route, index) => {
              return route.sidebarProps ? (
                 (
                  <SidebarItem item={route} key={index} />
                )
              ) : null;
            })}
        <SidebarItem
          item={{
            sidebarProps: {
              displayText: "Logout",
              icon: <LogoutIcon />,
            },
          }}
          onClick={() => logout()}
        />
      </List>
    </Drawer>
  );
};

export default Sidebar;
