import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { User } from "@supabase/auth-helpers-nextjs";

export const dynamic = 'force-dynamic'

export default function Header({ user }: { user: User }) {
    
    
    return (
        <header>
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                    <div />
                    <div>
                        {user ? (
                            <div className="flex items-center gap-4">
                                Hey, {user.email}!
                                <LogoutButton />
                            </div>
                        ) : (
                            <Link
                            href="/login"
                            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}