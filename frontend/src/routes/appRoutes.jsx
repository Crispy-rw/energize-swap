import DriversPage from "../pages/Driver/DriversPage";
import BatteriesPage from "../pages/Battery/BatteriesPage";
import StationsPage from "../pages/Station/StationsPage";
import SwapHistoryPage from "../pages/SwapHistory/SwapHistoryPage";
import BatteryMovementPage from "../pages/BatteryMovement/BatteryMovementPage";
import StationBatteryPage from "../pages/StationBattery/StationBatteryPage";
import StationBatteryMovementPage from "../pages/StationBatteryMovement/StationBatteryMovementPage";
import StationSwapHistoryPage from "../pages/StationBatteryHistory/StationSwapHistoryPage";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import BatterySaverIcon from '@mui/icons-material/BatterySaver';
import HistoryIcon from '@mui/icons-material/History';
import EvStationIcon from '@mui/icons-material/EvStation';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';

const appRoutes = [
  {
    role: "admin",
    path: "/admin/drivers",
    element: <DriversPage />,
    state: "drivers",
    sidebarProps: {
      displayText: "Drivers",
      icon: <SportsMotorsportsIcon />,
    },
  },
  { index: true,
    role: "admin",
    path: "/admin/stations",
    element: <StationsPage />,
    state: "stations",
    sidebarProps: {
      displayText: "Swap Stations",
      icon: <EvStationIcon />,
    },
  },
  {
    role: "admin",
    path: "/admin/batteries",
    element: <BatteriesPage />,
    state: "batteries",
    sidebarProps: {
      displayText: "Battery",
      icon: <BatterySaverIcon />,
    },
  },
  {
    role: "admin",
    path: "/admin/swaphistory",
    element: <SwapHistoryPage />,
    state: "swaphistory",
    sidebarProps: {
      displayText: "Swap History",
      icon: <HistoryIcon />,
    },
  },
  {
    role: "admin",
    path: "/admin/swaps/ongoing",
    element: <BatteryMovementPage />,
    state: "batterymovement",
    sidebarProps: {
      displayText: "Active Swaps",
      icon: <GpsFixedIcon />,
    },
  },
  {
    index: true,
    role: "manager",
    path: "/manager/swaps/ongoing",
    element: <StationBatteryMovementPage />,
    state: "managerbatterymovement",
    sidebarProps: {
      displayText: "Active Swaps",
      icon: <GpsFixedIcon />,
    },
  },
  {
    role: "manager",
    path: "/manager/station/battery",
    element: <StationBatteryPage />,
    state: "managerstationbatteries",
    sidebarProps: {
      displayText: "Battery",
      icon: <BatterySaverIcon />,
    },
  },
  {
    role: "manager",
    path: "/manager/swaphistory",
    element: <StationSwapHistoryPage />,
    state: "managerbatteryhistory",
    sidebarProps: {
      displayText: "History",
      icon: <HistoryIcon />,
    },
  },
];

export default appRoutes;