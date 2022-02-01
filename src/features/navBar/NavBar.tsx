import { NavLink } from 'react-router-dom';
import { Layout } from 'features/layout/Layout';

import styles from './NavBar.module.css';

export const NavBar = () => {
  return (
    <Layout>
      <nav className={styles.navContainer}>
        <NavLink className={styles.navlink} to='/add'>
          Add word
        </NavLink>
        <NavLink className={styles.navlink} to='/check'>
          Check yourself
        </NavLink>
      </nav>
    </Layout>
  );
};
