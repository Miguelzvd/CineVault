import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Layout } from "@/Pages/Layout";
import { Home } from "@/Pages/Home";
import { SavedContent } from "@/Pages/SavedContent";
import { WatchedContent } from "@/Pages/WatchedContent";

export function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          index
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="saved-content"
          index
          element={
            <Layout>
              <SavedContent />
            </Layout>
          }
        />

        <Route
          path="watched-content"
          index
          element={
            <Layout>
              <WatchedContent />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
