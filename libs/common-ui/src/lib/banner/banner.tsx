import styles from './banner.module.scss'

export interface BannerProps {
  text: string;
}

export function Banner(props: BannerProps) {
  return <header className={styles['container']}>{props.text}</header>;
}

export default Banner;