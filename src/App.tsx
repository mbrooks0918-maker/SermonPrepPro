import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CalendarProvider } from './contexts/CalendarContext';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { ThemeProvider } from './components/theme-provider';
import AppLayout from './components/AppLayout';
import LoginForm from './components/LoginForm';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const { loading } = useAppContext();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  
  return <AppLayout />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <CalendarProvider>
          <AppProvider>
            <AppContent />
          </AppProvider>
        </CalendarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;