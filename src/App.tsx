import { CSSProperties, useEffect, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import './stylesheets/App.css'
import './stylesheets/Header.css';
import { useAtomValue } from 'jotai'
import { lockScrollingAtom, scrollPositionAtom } from './libs/atoms'
import { PersonIcon, SearchIcon } from './Icons/Header';

export default function App() {
  const lockScrolling = useAtomValue(lockScrollingAtom)
  const scrollPosition = useAtomValue(scrollPositionAtom)

  useEffect(() => {
    if (lockScrolling)
      window.scrollTo({ top: 0 })
    else if (scrollPosition > 0)
      window.scrollTo({ top: scrollPosition })
  }, [lockScrolling, scrollPosition])

  const style = {
    position: 'fixed',
    top: scrollPosition * -1,
  } as CSSProperties

  return (
    <div className="body" style={lockScrolling ? style : undefined}>
      <Nav />
      <Outlet />
      <ScrollRestoration />
    </div>
  )
}

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu

  const menuItems = [
    { label: 'Categorias', icon: 'https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/51aac3069d5cba6194f75acf3b165066e3d23053037f420309054b66c52100ef?apiKey=0c364b68c1644e14b12786de4095f82b&' },
    { label: 'Assuntos', icon: 'https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/51aac3069d5cba6194f75acf3b165066e3d23053037f420309054b66c52100ef?apiKey=0c364b68c1644e14b12786de4095f82b&' },
    { label: 'Outras páginas', icon: 'https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/51aac3069d5cba6194f75acf3b165066e3d23053037f420309054b66c52100ef?apiKey=0c364b68c1644e14b12786de4095f82b&' },
    { label: 'Minha Lista' },
    { label: 'Lives' },
    { label: 'Fórum' },
  ];

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 0)
    })
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <button
          className="menuToggle"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <a className="logoContainer" href="/">
          <div className="logoIcon" />
          <h1 className="logoText">Logo</h1>
        </a>
        <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
          {menuItems.map((item, index) => (
            <button key={index} className="menuItem" onClick={() => setIsMenuOpen(false)}>
              <span>{item.label}</span>
              {item.icon && (
                <img src={item.icon} alt="" className="menuIcon" />
              )}
            </button>
          ))}
        </nav>
        <div className="userActions">
          <button className="searchButton" aria-label="Search">
            <span className="searchIcon">
              <SearchIcon size={24} color="white" />
            </span>
          </button>
          <button className="userProfileButton" aria-label="User profile">
            <span className="userIcon">
              <PersonIcon size={30} color="#121212" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
