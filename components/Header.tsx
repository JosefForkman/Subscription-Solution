import Link from "next/link";
import LogoutButton from "./LogoutButton";

// export const dynamic = 'force-dynamic'

export default async function Header() {



    return (
        <header>
            <nav>
                <ul>
                    <li>
                         
                            <div>
                                <LogoutButton />
                            </div>
                         
                            <Link
                                href="/login"
                            >
                                Login
                            </Link>
                        
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

