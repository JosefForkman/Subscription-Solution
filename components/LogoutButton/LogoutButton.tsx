import styles from './logoutButton.module.css';

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className={`${styles.logoutButton} bg-white h3`}>Logout</button>
    </form>
  );
}
