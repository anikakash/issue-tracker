import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PRIVATE_ROUTES } from "./paths";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { privateRoutes } from "./private-routes";
import { RouteGuard } from "react-access-boundary-v2";
import { lazy, Suspense } from "react";


const NotFound = lazy(()=>import('@/app/not-found'))

export const BaseRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PRIVATE_ROUTES.INDEX} element={<DashboardLayout />}>
          {privateRoutes.map(({ path, Component, permissions = [] }, index) => (
            <Route
              key={index}
              path={path}
              index={path === PRIVATE_ROUTES.INDEX}
              element={
                <RouteGuard permissions={permissions}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Component />
                  </Suspense>
                </RouteGuard>
              }
            />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
