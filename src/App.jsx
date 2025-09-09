import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import React from "react";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoder } from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import AddJobPage from "./pages/AddJobPage";
import MainLayout from "./layouts/Mainlayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage />}
          loader={jobLoder}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage />} 
          loader={jobLoder}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;

