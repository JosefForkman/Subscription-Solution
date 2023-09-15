import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { User } from '@supabase/auth-helpers-nextjs'

// export const dynamic = 'force-dynamic'

export default async function Header({ user }: { user: User }) {



    return (
        <header>
            <nav>
                <ul>
                    <li>
                        {user ? (
                            <div>
                                Hey, {user.email}!
                                <LogoutButton />
                            </div>
                        ) : (
                            <Link
                                href="/login"
                            >
                                Login
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link href="/prenumeration">Prenumerationer</Link>
                    </li>
                    <li>
                        <Link href="/">Hem</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

