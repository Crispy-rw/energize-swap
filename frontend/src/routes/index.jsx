import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import appRoutes from "./appRoutes";
import userData from "../configs/helpers";

const generateRoute = (routes) => {
  const info = userData();
  return (
    info &&
    routes
      ?.filter((r) => r?.role == info?.role)
      .map((route, index) => {
        return route.index ? (
          <Route
            index
            path={route.path}
            element={
                <PageWrapper state={route.state}>{route.element}</PageWrapper>
            }
            key={index}
          />
        ) : (
          <Route
            path={route.path}
            element={
                <PageWrapper state={route.child ? undefined : route.state}>
                  {route.element}
                </PageWrapper>
            }
            key={index}
          />
        );
      })
  );
};

export const routes = generateRoute(appRoutes);