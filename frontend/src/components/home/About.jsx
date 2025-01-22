import aboutBg from '../../../assets/images/aboutBg.png';
import mapSvg from '../../../assets/images/mapIcon.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

function getAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

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
                        <img src={mapSvg} alt="Icone de carte" /> Paris,
                        Île-de-france, France
                    </p>
                    <p className="about_text">
                        Salah, {getAge('05-30-2004')} years old. I&apos;ve been
                        passionate about computers and technology ever since I
                        was a kid, especially through my love for video games.
                        <br />
                        <br />
                        This curiosity led me to explore all kinds of areas,
                        like DevOps, making video games, and working with IoT.
                        I&apos;ve also had fun taking on CTF challenges, which
                        helped me learn more about cybersecurity.
                        <br />
                        <br />
                        For me, technology isn&apos;t just a job, it&apos;s
                        something I really love. It&apos;s how I express my
                        creativity and try out new ideas. Whether I&apos;m
                        coding, testing new tools, or building small projects, I
                        enjoy every moment. It&apos;s not just a career,
                        it&apos;s a part of who I am.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
