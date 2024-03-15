import React from 'react'
import aboutImage from "../img/aboutImage.jpg"
import '../../style.css';

const About = () => {
  return (
    <div className='about-container flex justify-center p-2 md:flex-col md:flex-wrap'>
   <div className="about-desc">
          <h1>
            Welcome to YumBites <br/> 
            <span>Where Every Craving Finds Its Cure!</span>
          </h1>
          <h4 className='md:py-2'>
            "Delivering Deliciousness to Your Doorstep!"
          </h4>
        </div>

     <div className='about-img'>
     <img className="w-[520px] h-[397px] md:w-auto md:h-[280px] rounded-lg " src={aboutImage} alt="aboutImage" />

     </div>

    </div>
  )
}

export default About;