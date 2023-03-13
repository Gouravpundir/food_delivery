import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState('');

  const [foodcat, setFoodcat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://vast-teal-clam-toga.cyclic.app/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodcat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><NavBar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id= 'carousel'>
    <div className='carousel-caption' style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300×300?burger" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300?pizza" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300?pasta" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button></div>
      <div className="container">
        {foodcat.length > 0 &&
          foodcat.map((data) => (
            <div key={data._id}>
              <div className="fs-3 m-3 ">{data.categoryName}</div>
              <hr />
              <div className="row">
                {foodItem.filter((item) => item.categoryName === data.categoryName).length > 0 ? (
                  foodItem
                  .filter((item) => (item.categoryName === data.categoryName)&&(item.categoryName.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItem) => (
                      <div key={filterItem._id} className="col-12 col-md-6 col-lg-3">
                        <Card 
                        foodItem={filterItem} 
                        options={filterItem.options}
                        ></Card >
                      </div>
                    ))
                ) : (
                  <div className="col">No such data found</div>
                )}
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
    </div>
  );
}
