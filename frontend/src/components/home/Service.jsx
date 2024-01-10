import dollarIcon from '../../../assets/images/Dollar_Sign.svg';
import ideaIcon from '../../../assets/images/Lightbulb.svg';
import cartIcon from '../../../assets/images/cart.svg';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function Service() {
    useEffect(() => {
        setTimeout(() => {
            gsap.fromTo(
                '.service_title',
                {
                    scale: 0,
                },
                {
                    scale: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.service_bigTitle',
                        start: 'top 60%',
                    },
                },
            );

            const TL = gsap.timeline({
                scrollTrigger: {
                    trigger: '.service_main',
                    start: 'top 60%',
                },
            });

            TL.fromTo(
                '.service_item img',
                {
                    opacity: 0,
                    y: -100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                },
            )
                .fromTo(
                    '.service_item hr',
                    { width: '0%', visibility: 'hidden' },
                    {
                        width: '80%',
                        visibility: 'visible',
                        ease: 'power2.out',
                        duration: 1.5,
                    },
                    '-=1',
                )
                .fromTo(
                    '.service_item p',
                    { opacity: 0 },
                    { opacity: 1, duration: 1.5, ease: 'power4.out' },
                    '-=1',
                );
        }, 1500);
    }, []);

    return (
        <>
            <div className="service_container" id="service">
                <div className="service_title">
                    <h2 className="service_bigTitle">Services</h2>
                    <h2 className="service_littleTitle">Services</h2>
                </div>
                <div className="service_main">
                    <div className="service_item">
                        <img src={dollarIcon} alt="Dollar Icon" />
                        <hr />
                        <p>
                            Prices vary enormously according to the amount of
                            work involved and the difficulty required.
                        </p>
                    </div>
                    <div className="service_item">
                        <img src={ideaIcon} alt="Idea Icon" />
                        <hr />
                        <p>
                            The orders we take are all about originality and
                            customer satisfaction!
                        </p>
                    </div>
                    <div className="service_item">
                        <img src={cartIcon} alt="Cart Icon" />
                        <hr />
                        <p>
                            I sell my services as a developer and designer, just
                            contact me to take an order.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
