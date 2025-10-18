import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-20">
      <div className="text-center px-4">
        <h1 className="mb-4 text-8xl font-bold text-accent">404</h1>
        <h2 className="mb-4 text-3xl font-bold text-foreground">Page Not Found</h2>
        <p className="mb-8 text-xl text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
