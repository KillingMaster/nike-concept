/* eslint-disable @typescript-eslint/no-explicit-any */
import Logos from '../assets/logos.svg?react';
import Search from '../assets/search.svg?react';
import Avatar from '../assets/avatar.svg?react';
import Cart from '../assets/cart.svg?react';
import { useEffect, useRef, useState } from 'react';
function Header() {
    const [mainImageSrc, setMainImageSrc] = useState('red.svg');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);
    //dict to map color to image src. kkey is image src, value is color name
    const colorMap: { [key: string]: string } = {
        'red.svg': 'white',
        'green.svg': 'rgba(0, 206, 59, 0.26)',
        'violet.svg': 'rgba(252, 6, 252, 0.19)'
    }


    const colorChange = (mainImageSrc: string) => {
       //wait for animation to finish
        if (isAnimating) {
            setTimeout(() => {
                setMainImageSrc(mainImageSrc);
                // set css variable value main-background:
                document.documentElement.style.setProperty('--main-background', `${colorMap[mainImageSrc]}`);
            }, 350);
        } else {
            setMainImageSrc(mainImageSrc);
            setMainImageSrc(mainImageSrc);
            // set css variable value main-background:
            document.documentElement.style.setProperty('--main-background', `${colorMap[mainImageSrc]}`);
        }
    }

    //useEffect to close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropRef.current && !dropRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    } , [dropRef]);

    /*
    when clicked on one of the shoes elements, animate the image as if it is moved to 
    centered-hero-img-container
    */
    useEffect(() => {
        const shoeImages = document.querySelectorAll('.shoe-img');
        const handleClick = (e:any) => {
          const targetElement = e.target as HTMLElement;
          if (targetElement) {
            targetElement.classList.add('animate');
            setIsAnimating(true);
            targetElement.addEventListener('animationend', function() {
              targetElement.classList.remove('animate');
              setIsAnimating(false);
            });
          }
        };
      
        shoeImages.forEach(img => {
          img.addEventListener('click', handleClick);
        });
      
        // Cleanup
        return () => {
          shoeImages.forEach(img => {
            img.removeEventListener('click', handleClick);
          });
        };
      }, []);

    //loader for the page
    useEffect(() => {
        window.onload = () => {
            setTimeout(() => {
                setIsLoaded(true);
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.classList.add('hidden');
            }
            } , 1000);
        };
    }, []);




    return (
        <>
            {isLoaded && <div className="header">
                <div className="navbar">
                    <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>
                        <Logos />
                    </div>
                    <div className="links-container">
                        <a id="home" href="#home">Home</a>
                        <a href="#man"> Man </a>
                        <a href="#woman">Woman </a>
                        <a href="#kid">Kid </a>
                        <a href="#sale">Sale </a>
                    </div>
                    <div className="actions-container" style={{ position: 'relative' }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => setShowSearchDropdown(!showSearchDropdown)}>
                            <Search />
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <Cart />

                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <Avatar />
                        </div>
                        {showSearchDropdown && <div className="search-dropdown" ref={dropRef}>
                            <div className="search-input-container">
                                <input type="text" placeholder="Search" />
                            </div>
                            <div className="search-dropdown-content">
                                <div className="search-dropdown-item" onClick={() => {
                                    colorChange('red.svg');
                                    setShowSearchDropdown(false);
                                }}>
                                    <div className="search-dropdown-item-image">
                                        <img src="red.svg" alt="" width={140} height={132} />
                                    </div>
                                    <div className="search-dropdown-item-content">
                                        <div className="title"> JORDAN  JUMPMAN 2021 PF</div>
                                        <div className="content" style={{ color: 'red' }}>
                                           RED
                                        </div>
                                    </div>
                                </div>
                                <div className="search-dropdown-item" onClick={() => {
                                    colorChange('green.svg');
                                    setShowSearchDropdown(false);
                                }}>
                                    <div className="search-dropdown-item-image">
                                        <img src="green.svg" alt="" width={140} height={132} />
                                    </div>
                                    <div className="search-dropdown-item-content">
                                        <div className="title"> JORDAN JUMPMAN 2021 PF</div>
                                        <div className="content" style={{ color: 'green' }}>
                                            GREEN
                                        </div>
                                    </div>
                                </div>
                                <div className="search-dropdown-item" onClick={() => {
                                    colorChange('violet.svg');
                                    setShowSearchDropdown(false);
                                }}>
                                    <div className="search-dropdown-item-image">
                                        <img src="violet.svg" alt="" width={140} height={132} />
                                    </div>
                                    <div className="search-dropdown-item-content">
                                        <div className="title"> JORDAN JUMPMAN 2021 PF</div>
                                        <div className="content" style={{ color: 'violet' }}>
                                            VIOLET 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="dots-container">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="centered-hero-img-container">
                    <img src={mainImageSrc} alt="main" />
                </div>
                <div className="pricing">
                    <div className="relative" style={{ position: 'relative' }}>
                        <div className="exclusive">
                            exclusive
                        </div>
                        <div className="other">
                            <div className="block-one">
                                134$
                            </div>
                            <div className="block-two">
                                <div className="title"> JORDAN</div>
                                <div className="content">
                                    JUMPMAN 2021 PF
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <div className="bottom-panel">
                    <div className="label">CHOOSE COLOR :</div>
                    <div className="panel-content">
                        <div className="shoes-items" style={{ cursor: 'pointer' }}>
                            <img src="red.svg" className="shoe-img" alt="" width={140} height={132} onClick={() => colorChange('red.svg')} />
                            <img src="green.svg" className="shoe-img" alt="" width={140} height={132} onClick={() => colorChange('green.svg')} />
                            <img src="violet.svg" className="shoe-img" alt="" width={140} height={132} onClick={() => colorChange('violet.svg')} />
                        </div>
                        <div className="buttons-container">
                            <button className="add-to-cart-btn">ADD TO CART</button>
                            <button className="buy-now-btn">BUY NOW</button>
                        </div>
                        <div className="description-container">
                            <div className="description-title">
                                INSPIRATION
                            </div>
                            <div className="description-content">
                                Inspired by the design of the latest Air Jordan game shoe, the Jordan Jumpman 2021 helps up-and-coming players level up their game.
                            </div>
                        </div>
                    </div>
                </div>
            </div> }
            <div className="resolution-not-supported">
                <div className="content">
                    <div className="title">
                    ( ˘･з･) This Dev is actually a lazy one
                    </div>
                    <div className="description">
                        Sorry, this page is not supported on your resolution, please try again on a larger screen.
                        It might never be supported as i'm missing the complete figma design.
                        Try on at least 980px width screen. 
                        Best Experience  still start from laptop (1024px width) and above.
                    </div>
                </div>
            </div>
            <div className="loader">
                
            </div>
        </>
    )
}

export default Header
