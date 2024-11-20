import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
