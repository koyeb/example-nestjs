import { useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  email: string;
}

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/auth");
      } else {
        try {
          jwtDecode<JwtPayload>(token);
        } catch (error) {
          localStorage.removeItem("token");
          router.replace("/auth");
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
