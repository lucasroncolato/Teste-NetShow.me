import { CSSProperties, useEffect, useState } from 'react'
import {  Outlet, ScrollRestoration } from 'react-router-dom'
import './stylesheets/App.css'
import './stylesheets/Header.css';
import { useAtomValue } from 'jotai'
import { lockScrollingAtom, scrollPositionAtom } from './libs/atoms'

export default function App() {
  const lockScrolling = useAtomValue(lockScrollingAtom)
  const scrollPosition = useAtomValue(scrollPositionAtom)

  useEffect(() => {
    if (lockScrolling)
      window.scrollTo({ top: 0 })
    else if (scrollPosition > 0)
      window.scrollTo({ top: scrollPosition })
  }, [lockScrolling,scrollPosition])

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
  const [isScrolled, setIsScrolled] = useState(false)


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
        <a className="logoContainer" href="/">
          <div className="logoIcon" />
          <h1 className="logoText">Logo</h1>
        </a>
        <nav className="navigation">
          {menuItems.map((item, index) => (
            <button key={index} className="menuItem">
              <span>{item.label}</span>
              {item.icon && (
                <img src={item.icon} alt="" className="menuIcon" />
              )}
            </button>
          ))}
        </nav>
        <div className="userActions">
          <button className="searchButton" aria-label="Search">
            <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/293caca88da0bb00f37741e8aee41ec7b65a74306316eb8044a10c043afe3f7a?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="searchIcon" />
          </button>
          <button className="userProfileButton" aria-label="User profile">
            <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/d1e0f926970f01d0c4d796791c73b7bebeb379232a1b98fc7347fe9266eba824?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="userIcon" />
          </button>
        </div>
      </div>
    </nav>
  )
}