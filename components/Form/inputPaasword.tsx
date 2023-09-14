import styles from "./input.module.css";
export default function InputPassword({placeholder}: {placeholder:string}) {
    return (
      <input className={styles.input} type="password" placeholder={placeholder} />
    )
  }