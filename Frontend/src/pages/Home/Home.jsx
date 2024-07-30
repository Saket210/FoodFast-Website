import { useState } from "react";
import Banner from "../../components/Banner/Banner"
import Foods from "../../components/Foods/Foods"
import Menu from "../../components/Menu/Menu"

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <>
        <Banner/>
        <Menu category={category} setCategory={setCategory}/>
        <Foods category={category}/>
    </>
  )
}

export default Home