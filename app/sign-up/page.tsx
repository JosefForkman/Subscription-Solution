import styles from "./login.module.css";
import InputText from '@/components/Form/InputText'
import InputPassword from "@/components/Form/inputPaasword";
import Link from 'next/link'
import Messages from './messages'
import SocialMediaSection from "@/components/SocialMedia/SocialMediaSection";
import Image from "next/image";
import owl from './../../public/svg/owl.svg'

export default function Login() {


  return (
    <>
      <Image src={owl} alt="Logo"  className={styles.logo}/>
      <form
        className={styles.loginForm}
        action="/auth/sign-up"
        method="post"
      >
        <InputText placeholder='användarnamn' name="email" />
        <InputPassword placeholder='lösenord' name="password" />

        <p className="h4 text-gray text-center">
          När du skapar ett konto godkänner du våra
          <br />
          <Link href='/GDPL'>användarvillkor.</Link>
        </p>

        {/* Message component not sure if we should use it */}
        {/* <Messages /> */}
        <button className={"btn bg-accent text-white text-center h1"}>Skapa konto</button>
      </form >

      <p className={"text-center text-black" + " " + styles.divider}>eller</p>

      <SocialMediaSection />

      <p className="h4 text-center text-gray">Har du redan ett konto? <Link href="/login">Logga in här</Link></p>

    </>
  )
}
