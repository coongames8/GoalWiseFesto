import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

const ProtectedPricingRoute = ({ children }) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      const previousPath = '/login';
      navigate(previousPath);
    } else if(user && !user.isPremium) {
      const previousPath = '/pricing';
      navigate(previousPath);
    }
  }, [user, navigate, location]);

  return children;
};

export default ProtectedPricingRoute;