import styles from "./input.module.css";
export default function InputText({placeholder}: {placeholder:string}) {
    return (
      <input className={styles.input} type="text" placeholder={placeholder} />
    )
  }