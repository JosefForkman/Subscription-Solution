"use client"
import styles from "./SocialMedia.module.css";

import Image from "next/image";
import facebook from "../../app/assets/facebook.svg"
import google from "../../app/assets/google.svg"
import apple from "../../app/assets/apple.svg"

import { cookies } from 'next/headers'
import { createServerComponentClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function () {
  const supabase = createClientComponentClient();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      // options: {
      //   queryParams: {
      //     access_type: 'offline',
      //     prompt: 'consent',
      //   },
      // },
    })
  }
  async function signInWithFacbook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      // options: {
      //   queryParams: {
      //     access_type: 'offline',
      //     prompt: 'consent',
      //   },
      // },
    })
  }

  return (
    <section className={styles.socialMediaSection}>
      <button onClick={signInWithGoogle} className={"btn bg-white"}>
        <Image width={44} height={44} src={google} alt="" />
        <span className="h3">Logga in med google här</span>
      </button>
      <button className={"btn bg-black"}>
        <Image width={44} height={44} src={apple} alt="" />
        <span className="h3 text-white">Logga in med apple här</span>
      </button>
      <button onClick={signInWithFacbook} className={"btn bg-facebook"}>
        <Image width={44} height={44} src={facebook} alt="" />
        <span className="h3 text-white">Logga in med facebook här</span>
      </button>

    </section>
  )
}