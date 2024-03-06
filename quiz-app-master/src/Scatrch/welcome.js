import Nav from "./Navbar";
import Header from "../Scatrch/header";
import Features from "../Components/FeatureSection/features";
import Footer from "../Components/Footer/Footer";
function WelcomePage() {
  return (
    <div>
      <header class="header-blue">
        <Nav
          brandText="Quiz Management System"
          menuItems={[
            { text: "Login", link: "/login" },
            { text: "Register", link: "/Registration" },
          ]}
        />

        <Header />
      </header>
      <Features />
      <Footer />
    </div>
  );
}

export default WelcomePage;
