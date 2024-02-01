import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HeaderShimmer = () => {
  return (
    <div className='header-container '>
    <div className="shimmer-header"> 
      <Skeleton width={70} height={70} style={{ borderRadius: 8 }} />
      <h2><Skeleton width={150} /></h2>
      <div className="nav-items">
        <ul>
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
    <div data-testid="shimmer" className="cards-container flex flex-wrap md:justify-center "> 
      {Array(cards).fill(0).map((_, index) => (
        <div className="card-skeleton m-3" key={index}>
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

const FooterShimmer =() =>{
  return(
    <div className="footer-text">
      <h4><Skeleton/></h4>
    </div>
  );
};

export default Shimmer;
export {HeaderShimmer};
export {FooterShimmer};
