import ScenePage from "./pages/SсenePage";
import { SnackbarProvider } from './context/SnackbarContext';
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectScenesPage } from "./pages/ProjectsScenesPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { AuthPage } from "./pages/AuthPage";
import { LogoutHeader } from "./components/auth/LogoutHeader";

function App() {
  return (
     <SnackbarProvider>
      <Router>
        <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <LogoutHeader>
                  <ProjectsPage />
                </LogoutHeader>
              </ProtectedRoute>
            } />
            <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
            <Route path="/projects/:projectId/scenes" element={
              <ProtectedRoute>
                <ProjectScenesPage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/scenes/:sceneId/edit" element={
              <ProtectedRoute>
                <ScenePage />
              </ProtectedRoute>
            } />
        </Routes>
    </Router>
    </SnackbarProvider>
  );
}

export default App;
