import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getPrenumerationer } from "@/lib/Prenumerationer";
import NavbarContainer from "./NavbarContainer/NavbarContainer";


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
                        <Link href="/">Hem</Link>
                    </li>
                    <li>
                        <Link href="/Overview">Överblick</Link>
                    </li>
                </ul>
            </nav> */}
        </header>
    )
}
