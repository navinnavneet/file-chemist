import { ArrowRightAltSharp } from '@material-ui/icons'

import Link from 'next/link'

export default function Card (props: {
    title: string,
    text: string,
    link: string
}) {
    return (
        <div className="link-card">
            <div className="link-card__header">
                <h2>{props.title}</h2>
                <Link href={props.link}>
                    <a>
                        <button>
                            <ArrowRightAltSharp style={{fontSize: '48px'}} />
                        </button>
                    </a>
                </Link>
            </div>
            <p>{props.text}</p>
        </div>
    )
}