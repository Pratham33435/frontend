// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // we’ll add animations here
import Home from "./components/Home";
import CreativeWritings from "./pages/CreativeWritings";
import Category from "./pages/Category";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Toogle from "./components/toggle";
import PostList from "./components/Postlist";
import PostPage from "./components/PostPage";
import AdminPage from "./pages/Adminpage";


function App() {
  return (
    <>
      <div >
      <Router>
    <Toogle />
    <Routes>
      <Route path="/" element={<Home />} />
     
      <Route path="/CreativeWritings" element={<CreativeWritings />} />
      <Route path="/Category" element={<Category />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/poems" element={<PostList category="poems" />} />
<Route path="/articles" element={<PostList category="articles" />} />
<Route path="/stories" element={<PostList category="stories" />} />
<Route path="/others" element={<PostList category="others" />} />
 <Route path="/post/:id" element={<PostPage />} />

<Route path="/post/:id" element={<PostPage />} />
 <Route path="/admin" element={<AdminPage />} />




      

      
    </Routes>
    </Router>

    </div>
    
   
    </>
  )
}

export default App;
