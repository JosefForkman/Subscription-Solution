import styles from "./input.module.css";

type props = {
  placeholder: string,
  name: string
}

export default function InputText({ placeholder, name }: props) {
  return (
    <input className={styles.input} type="text" name={name} placeholder={placeholder} />
  )
}