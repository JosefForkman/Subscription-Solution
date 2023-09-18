import styles from "./input.module.css";

type props = { 
  placeholder: string,
  name: string
}

export default function InputPassword({placeholder, name}: props) {
    return (
      <input className={styles.input} type="password" name={name} placeholder={placeholder} />
    )
  }