import Home from "@/pages/Home/Home";
import SmartNotes from "@/pages/SmartNotes/SmartNotes";
import FocusMode from "@/pages/FocusMode/FocusMode";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Settings from "@/pages/Settings/Settings";

import {
  NavigationProvider,
  useNavigation,
} from "@/context/NavigationContext";

function Router() {
  const { page } = useNavigation();

  switch (page) {
    case "smart-notes":
      return <SmartNotes />;

    case "focus-mode":
      return <FocusMode />;

    case "dashboard":
      return <Dashboard />;

    case "settings":
      return <Settings />;

    default:
      return <Home />;
  }
}

export default function App() {
  return (
    <NavigationProvider>
      <Router />
    </NavigationProvider>
  );
}