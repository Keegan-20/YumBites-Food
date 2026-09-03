import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HeaderShimmer = () => {
  return (
    <div className='header-container'>
      <div className="shimmer-header items-center">
        <Skeleton width={64} height={64} circle />
        <h2><Skeleton width={150} height={20} borderRadius={999} /></h2>
        <div className="nav-items">
          <ul className="flex gap-3">
            <li><Skeleton width={60} height={16} borderRadius={999} /></li>
            <li><Skeleton width={60} height={16} borderRadius={999} /></li>
            <li><Skeleton width={60} height={16} borderRadius={999} /></li>
          </ul>
        </div>
        <button className="logIn"><Skeleton width={90} height={40} borderRadius={999} /></button>
      </div>
    </div>
  );
};

const Shimmer = ({ cards }) => {
  return (
    <div data-testid="shimmer" className="cards-container max-w-7xl mx-auto px-3 flex flex-wrap justify-center animate-fade-in">
      {Array(cards).fill(0).map((_, index) => (
        <div className="card-skeleton m-3" key={index}>
          <Skeleton width={260} height={170} style={{ borderRadius: 16 }} />
          <h2 className="mt-3"><Skeleton width={180} height={16} borderRadius={8} /></h2>
          <p className="mt-1"><Skeleton width={230} height={12} borderRadius={8} /></p>
          <p className="mt-1"><Skeleton width={150} height={12} borderRadius={8} /></p>
          <h3 className="mt-2"><Skeleton width={70} height={20} borderRadius={999} /></h3>
        </div>
      ))}
    </div>
  );
};

const FooterShimmer = () => {
  return (
    <div className="footer-text">
      <h4><Skeleton height={40} /></h4>
    </div>
  );
};

export default Shimmer;
export { HeaderShimmer };
export { FooterShimmer };
