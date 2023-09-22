import Link from "next/link";
import LogoutButton from "./LogoutButton";
import NavbarContainer from "./NavbarContainer/NavbarContainer";

// export const dynamic = 'force-dynamic'

export default async function Header() {



    return (
        <header>
            <NavbarContainer />
            {/* <nav>
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
            </nav> */}
        </header>
    )
}

