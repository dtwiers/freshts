import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import styles from './navbar.module.css';
import fresh from '../../freshts.svg';

const links = [
  {
    label: 'About',
    href: '#',
  },
  {
    label: 'Docs',
    href: '#',
  },
  {
    label: 'Guides',
    href: '#',
  },
];

export const Navbar: Component = () => {
  return (
    <header class={styles.header}>
      <img src={fresh} class={styles.logo} alt="logo" />
      <h1 class={styles.heading}>fresh-ts</h1>
      <nav class={styles.nav}>
        {links.map((link) => (
          <Link class={styles.link} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
