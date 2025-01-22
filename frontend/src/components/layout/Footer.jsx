export default function Footer() {
    return (
        <footer>
            <p>
                © {new Date().getFullYear()}. Made by{' '}
                <a href="https://www.sagby.fr/" target="_BLANK" rel="noreferrer">
                    Sagby
                </a>
                .
            </p>
        </footer>
    );
}
