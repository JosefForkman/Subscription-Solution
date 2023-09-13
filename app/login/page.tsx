import styles from "./login.module.css";
import InputText from '@/components/Form/InputText'
import Link from 'next/link'
import Image from "next/image";
import Messages from './messages'
import facebook from "../assets/facebook.svg"
import google from "../assets/google.svg"
import apple from "../assets/apple.svg"

import { cookies } from 'next/headers'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const dynamic = 'force-dynamic'

export default function Login() {
  const supabase = createServerComponentClient({ cookies })
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }
  return (
    <>
      <form
        className={styles.loginForm}
        action="/auth/sign-in"
        method="post"
      >
        <InputText placeholder='användarnamn' />
        <InputText placeholder='lösenord' />

        <p className="h4 text-light-gray text-center">
          Har du glömt ditt lösenord?
          <br />
          <Link href='/'>Återställ det här.</Link>
        </p>

        {/* Message component not sure if we should use it */}
        {/* <Messages /> */}
        <button className={styles.btn + " " + "bg-accent text-white text-center h1"}>Logga in</button>
      </form >

      <p className={"text-center" + " " + styles.divider}>eller</p>

      <section className={styles.socialMediaSection}>
        <button onClick={signInWithGoogle} className={styles.btn + " " + "bg-white"}>
          <Image width={44} height={44} src={google} alt="" />
          <span className="h3">Logga in med google här</span>
        </button>
        <button className={styles.btn + " " + "bg-black"}>
          <Image width={44} height={44} src={apple} alt="" />
          <span className="h3 text-white">Logga in med apple här</span>
        </button>
        <button className={styles.btn + " " + "bg-facebook"}>
          <Image width={44} height={44} src={facebook} alt="" />
          <span className="h3 text-white">Logga in med facebook här</span>
        </button>

        <p className="h4 text-center text-gray">Har du inte ett konto? <Link href="/sign-up">Skapa ett här</Link></p>
      </section>

    </>
  )
}
