import React from "react";
import { Route, Routes} from "react-router-dom";
import withRouter from "../hooks/withRouter"
import { Home } from "../pages/home";
import Photo from "../pages/photo";
import Video from "../pages/video";
import Lumiere from "../pages/lumiere";
import { ContactUs } from "../pages/contact";
import { Socialicons } from "../components/socialicons";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AnimatedRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      classNames="page"
      unmountOnExit
    >
     <Routes location={location}>

  <Route path="/" element={<Home />} />

  <Route path="/photo" element={<Photo />} />
  <Route path="/video" element={<Video />} />
  <Route path="/lumiere" element={<Lumiere />} />

  <Route path="/contact" element={<ContactUs />} />

  {/* sécurité */}
  <Route path="*" element={<Home />} />

</Routes>
    </CSSTransition>
  </TransitionGroup>
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
