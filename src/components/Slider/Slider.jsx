import {useEffect, useState} from 'react';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import './Slider.scss'
import { NavLink } from 'react-router-dom';
import { slides } from '../../data';

export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = async (direction) => {
        if(direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slides.length - 1)
        } else {
            setSlideIndex(slideIndex < slides.length - 1 ? slideIndex + 1 : 0)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            handleClick("right");
        }, 10000)
    }, [slideIndex]);
    
    return (
        <div className="slider container">
                
        <div className="arrow"  onClick={() => handleClick("left")}>
           <IoArrowBack />
        </div>
           
           <div className="wrapper" style={{transform: `translateX(${(slideIndex-1) * -100}vw)`}}>
            {
                slides && slides.map(slide => {
                    return (
                        <div className="slider" key={slide.id}>
                            <div className="background" style={{
                                background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.img})`,
                                //backgroundAttachment: 'fixed'
                            }}>
                            </div>
                            <p>{slide.title}</p>
                            <NavLink to={slide.link} className='btn' title={slide.title.split(" ")[0] + "..."}>LEARN MORE</NavLink>
                        </div>
                    )
                })
            }
           </div>            
        <div className="arrow" onClick={() => handleClick("right")}>
           <IoArrowForward />
        </div>
    </div>
    );
}