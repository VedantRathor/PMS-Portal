import axios from "axios"
import { useState, useEffect } from "react";
import HandleCardData from "./HandleCardData";
import SideBar from "./ProjectContainer/sidebar";

const Product = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');

        setData((response.data));
        setLoading(true);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div style={{display:"flex" ,justifyContent:'flex-start' , gap:'30px'}}>
        <div>
          <SideBar></SideBar>
        </div>
        <div style={{width:'70%'}}>
          <h1 className="headgin">Projects</h1>
          <div id="datacontainerrow" className=" majorcontainer">
            {data ? < HandleCardData item={data} /> : <h1>loading...</h1>}
          </div>
        </div>
      </div>


    </>

  )
}

export default Product