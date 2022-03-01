import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import API_URL from "../../config";
import { ReserveForm } from "../../components/ReserveForm";
import css from "./reserve.module.css";
import useFetch from "../../components/hooks/useFetch";

const Reserve = () => {
  const location = useLocation();
  const id = location.state;

  const [spaces] = useFetch(`${API_URL}/spaces/${id}`);

  const space = spaces[0];

  const [users] = useFetch(`${API_URL}/users/${id}`);

  const user = users[0];

  return (
    <div>
      <Header />
      <div>
        {" "}
        <p>{space.purpose_of_space}</p>
        <p>{space.address}</p>
        <p>4.5</p>
        <p>Reviews(48)</p>
      </div>

      <div>
        {space.images &&
          space.images.map((item, index) => {
            return (
              <div key={index}>
                <img src={item} alt="" />
              </div>
            );
          })}
        <div className={css.reserveContainer}>
          <div>
            <h2>Property Details</h2>
            <h3>{space.type_of_space}</h3>
            <h3>{space.fraction_of_space}</h3>
            <p>Check in: </p>
            <p>Cancellation</p>
            <p>Instructions on how to use go here</p>
            <h3>Amenities</h3>
            <div>
              {space.amenities &&
                space.amenities.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
            </div>
            <p>Our host says "{space.additional_information}"</p>
          </div>
          <div>
            <ReserveForm price={space.hourly_price} user={user} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reserve;
