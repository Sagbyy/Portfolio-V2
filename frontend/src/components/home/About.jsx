import aboutBg from '../../../assets/images/aboutBg.png';
import mapSvg from '../../../assets/images/mapIcon.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

function About() {
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        // Mobile size
        mm.add('(max-width: 768px)', () => {
            const TL = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about_mainContent',
                    start: 'top 60%',
                },
            });

            TL.fromTo(
                '.about_sectionInfo h3',
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                },
            )
                .fromTo(
                    '.about_sectionInfo .about_location',
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 1.5,
                        ease: 'power4.out',
                    },
                    '-=1',
                )
                .fromTo(
                    '.about_sectionInfo .about_text',
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 1.5,
                        ease: 'power4.out',
                    },
                    '-=1',
                );

            // Reset the position of the container when the user change the size desktop to mobile
            gsap.set('.about_sectionInfo', { x: 0, opacity: 1 });
        });

        // Desktop and tablet size
        mm.add('(min-width: 769px)', () => {
            gsap.fromTo(
                '.about_image',
                {
                    x: '-500%',
                },
                {
                    x: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.about_mainContent',
                        start: 'top 60%',
                    },
                },
            );

            gsap.fromTo(
                '.about_sectionInfo',
                {
                    x: '200%',
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.about_mainContent',
                        start: 'top 60%',
                    },
                },
            );

            // Reset the opacity of the text when the user change the size mobile to desktop
            gsap.set(
                '.about_sectionInfo h3, .about_sectionInfo .about_location, .about_sectionInfo .about_text',
                {
                    opacity: 1,
                },
            );
        });

        gsap.fromTo(
            '.about_title',
            {
                opacity: 0,
                scale: 0,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.about_title',
                    start: 'top 60%',
                },
            },
        );
    }, []);

    return (
        <div className="about_container" id="about">
            <div className="about_title">
                <h2 className="about_bigTitle">About</h2>
                <h2 className="about_littleTitle">About</h2>
            </div>

            <div className="about_mainContent">
                <div className="about_image">
                    <img src={aboutBg} alt="Background code" />
                </div>

                <div className="about_sectionInfo">
                    <h3>Sagby</h3>
                    <p className="about_location">
                        <img src={mapSvg} alt="Icone de carte" /> Île-de-france,
                        France
                    </p>
                    <p className="about_text">
                        Salah, 19 years old, currently in my second year of
                        Computer Science at the IUT in Montreuil.
                        <br />
                        <br />
                        I&apos;m interested in the world of development in
                        general, I started by learning web development with
                        Javascipt and HTML CSS.
                        <br />
                        <br />I spend my free time perfecting my skills in
                        programming languages on a self-taught basis. I&apos;ve
                        been interested in programming since 2020, and I&apos;ll
                        continue to perfect my skills to improve the quality of
                        my services and gain as much experience as possible.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
