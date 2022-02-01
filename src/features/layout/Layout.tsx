import styles from './Layout.module.css';

export const Layout = ({ children }: any) => {
  return <div className={styles.mainContainer}>{children}</div>;
};
