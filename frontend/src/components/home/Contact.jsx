import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { successToast, errorToast } from '../../utils/toast.jsx';
import { useEffect, useRef } from 'react';

export default function Contact() {
    const form = useRef();
    const inputName = useRef();
    const inputEmail = useRef();
    const inputMessage = useRef();

    useEffect(() => {
        setTimeout(() => {
            gsap.fromTo(
                '.contact_title',
                {
                    scale: 0,
                },
                {
                    scale: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.contact_bigTitle',
                        start: 'top 60%',
                    },
                },
            );
        }, 1500);
    });

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAIL_PUBLIC_KEY,
            )
            .then(
                () => {
                    successToast('Your message has been sent successfully');
                    inputName.current.value = '';
                    inputEmail.current.value = '';
                    inputMessage.current.value = '';
                },
                () => {
                    errorToast("Your message hasn't been sent successfully");
                },
            );
    };

    return (
        <>
            <div className="contact_container" id="contact">
                <div className="contact_title">
                    <h2 className="contact_bigTitle">Contact</h2>
                    <h2 className="contact_littleTitle">Contact</h2>
                </div>
                <div className="contact_main">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="contact_top">
                            <div className="contact_name">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Your name"
                                    ref={inputName}
                                    required={true}
                                />
                            </div>
                            <div className="contact_email">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="name@example.com"
                                    required={true}
                                    ref={inputEmail}
                                />
                            </div>
                        </div>
                        <div className="contact_bottom">
                            <label>Message</label>
                            <textarea
                                name="message"
                                placeholder="Your message"
                                ref={inputMessage}
                                required={true}
                            />
                        </div>
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </div>
        </>
    );
}
