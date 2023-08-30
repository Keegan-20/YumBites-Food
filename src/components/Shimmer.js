import React from 'react'
import Skeleton from 'react-loading-skeleton'
import logoImage from "../img/logo.svg";
import 'react-loading-skeleton/dist/skeleton.css'

const HeaderShimmer = () => {
  return (
    <div className='header-container'>
    <div className="shimmer-header">
      {/* <img className="logo" src={logoImage} alt="logoImage" /> */}
      <Skeleton width={70} height={70} style={{ borderRadius: 8 }} />
      <h2><Skeleton width={150} /></h2>
      <div className="nav-items">
        <ul>
          <li><Skeleton width={60} /></li>
          <li><Skeleton width={60} /></li>
          <li><Skeleton width={60} /></li>
          <li><Skeleton width={60} /></li>
        </ul>
      </div>
      <button className="logIn"><Skeleton /></button>
    </div>
    </div>
  );
};

const Shimmer = ({ cards }) => {
  return (
    <div className="cards-container"> 
      {Array(cards).fill(0).map((_, index) => (
        <div className="card-skeleton" key={index}>
          <Skeleton width={230} height={200} style={{ borderRadius: 8 }} />
          <h2><Skeleton /></h2>
          <p><Skeleton /></p>
          <p><Skeleton /></p>
          <h3><Skeleton /></h3>
        </div>
      ))}
    </div>
  );
};
export default Shimmer;
export  {HeaderShimmer}
