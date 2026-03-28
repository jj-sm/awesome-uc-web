import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DataProvider } from "@/hooks/use-data";
import Home from "@/pages/home";
import ProjectsPage from "@/pages/projects";
import DocsPage from "@/pages/docs";
import SocialPage from "@/pages/social";
import AllPage from "@/pages/all";
import ContributePage from "@/pages/contribute";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/projects/:sub" component={ProjectsPage} />
          <Route path="/docs" component={DocsPage} />
          <Route path="/docs/:sub" component={DocsPage} />
          <Route path="/social" component={SocialPage} />
          <Route path="/social/:sub" component={SocialPage} />
          <Route path="/all" component={AllPage} />
          <Route path="/contribute" component={ContributePage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <DataProvider>
            <Router />
          </DataProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
