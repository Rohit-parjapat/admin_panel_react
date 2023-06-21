import "./App.css";
import Navbar from "./components/Navbar and footer/Navbar";
import Footer from "./components/Navbar and footer/Footer";
import UserDetails from "./components/UsersData/Users";

function App() {
  return (
    <div className="App">
      <Navbar />
      <UserDetails />
      <Footer />
    </div>
  );
}
export default App;
