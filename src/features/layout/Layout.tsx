import styles from './Layout.module.css';

type LayoutProps = {
  children: any;
};

export const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.mainContainer}>{children}</div>;
};
