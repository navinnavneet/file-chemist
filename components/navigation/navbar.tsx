import Link from 'next/link'
import { VerifiedUserSharp, EcoSharp } from '@material-ui/icons';

export default function Navbar(props: {}) {
    return (
        <nav className="navbar">
            <Link href="/">
                <a>
                    <div className="navbar__logo-container">
                        <img src="/safari-pinned-tab.svg" alt="Logo" className="logo" />
                        <p className="logo-text">FileChemist</p>
                    </div>
                </a>
            </Link>
            <div className="navbar__links">
                <button className="link">
                    <div className="icon">
                        <VerifiedUserSharp />
                    </div>
                    <Link href="/privacy"><a>Privacy</a></Link>
                </button>
                <button className="link">
                    <div className="icon green">
                        <EcoSharp/>
                    </div>
                    <Link href="/environment"><a>Environmental Impact</a></Link>
                </button>
            </div>
        </nav>
    )
}