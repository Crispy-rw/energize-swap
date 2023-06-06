import React from "react";
import { Navigate, Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import appRoutes from "./appRoutes";
import userData from "../configs/helpers";

const generateRoute = (routes) => {
  const info = userData();
  return (
    info &&
    routes
      .map((route, index) => {
        return route.index ? (
          <Route
            index
            path={route.path}
            element={
              <ProtectedRoute role={route.role}>
                <PageWrapper state={route.state}>{route.element}</PageWrapper>
              </ProtectedRoute>
            }
            key={index}
          />
        ) : (
          <Route
            path={route.path}
            element={
              <ProtectedRoute role={route.role}>
                <PageWrapper state={route.child ? undefined : route.state}>
                  {route.element}
                </PageWrapper>
              </ProtectedRoute>
            }
            key={index}
          />
        );
      })
  );
};

const ProtectedRoute = ({ role, redirectPath = "/unauthorized", children }) => {
  const userInfo = userData()
  console.log("========", userInfo)
  if (userInfo == null || role !== userInfo?.role) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export const routes = generateRoute(appRoutes);
