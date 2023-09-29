"use client"
import styles from "./login.module.css";
import InputText from '@/components/Form/InputText'
import InputPassword from "@/components/Form/inputPaasword";
import Link from 'next/link'
import Messages from './messages'
import SocialMediaSection from "@/components/SocialMedia/SocialMediaSection";
import Image from "next/image";
import owl from './../../public/svg/owl.svg'
import { useEffect } from "react";
import runOneSignal from "@/lib/onesignal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = 'force-dynamic'

export default function Login() {
    
    const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect('/');
  }

  const supabase = createClientComponentClient()

  useEffect(() => {
    setNotification();

    async function setNotification() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        runOneSignal(user.id);
      }
    }
  }, [])


  return (
    <>
      <Image src={owl} alt="Logo" className={styles.logo} />

      <form
        className={styles.loginForm}
        action="/auth/sign-in"
        method="post"
      >
        <InputText placeholder='användarnamn' name="email" />
        <InputPassword placeholder='lösenord' name="password" />

        <p className="h4 text-gray text-center">
          Har du glömt ditt lösenord?
          <br />
          <Link href="/">Återställ det här.</Link>
        </p>

        {/* Message component not sure if we should use it */}
        <Messages />
        <button className={'btn bg-accent text-white text-center h1'}>
          Logga in
        </button>
      </form>

      <p className={'text-center text-black' + ' ' + styles.divider}>eller</p>

      <SocialMediaSection />
      
      <p className="h4 text-center text-gray">Har du inte ett konto? <Link href="/sign-up">Skapa ett här</Link></p>

      <p className="h4 text-center text-gray">
        Har du inte ett konto? <Link href="/sign-up">Skapa ett här</Link>
      </p>
    </>
  );
}
