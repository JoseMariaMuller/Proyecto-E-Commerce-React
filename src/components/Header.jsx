import '../styles/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header-content">

                <h1 className="header-title" data-aos="fade-down">📖 Librería Aurora</h1>

                <p className="header-subtitle" data-aos="fade-down" data-aos-delay="200">Explorá historias que inspiran</p>
            </div>
        </header>
    );
}

export default Header;