// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

// Next
import Head from 'next/head'

// Hooks
import useInitialCookie from '../../hooks/useInitialCookie';

// Components
import Navbar from '../navigation/navbar'
import Footer from '../navigation/footer'
import CookieConsent from '../general/cookie_consent';


export default function BasicPage(props: {
    className: string,
    headTags: React.ReactNode[],
    title: string,
    children?: React.ReactNode
}) {

    useInitialCookie();
    let consentGiven = useSelector((state: RootState) => state.app.cookieConsentGiven);

    let pageDescription = "Convert, resize, merge, and many more actions on PDFs, JPGs, and PNGs";

    return <div>
        <Head>

                <script async src="https://www.googletagmanager.com/gtag/js?id=G-00D7ZZEWWZ"></script>

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('consent', 'default', {
                                'ad_storage': 'denied',
                                'analytics_storage': 'denied'
                            });
                            gtag('js', new Date());          
                            gtag('config', 'G-00D7ZZEWWZ');
                        `,
                    }}
                />


                <title>{props.title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="pdf, png, jpg, resize, merge, convert, combine, edit, file" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:url" content="https://filechemist.com/" />
                <meta property="og:title" content={props.title} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={""} />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@FileChemist" />
                <meta name="twitter:url" content="https://filechemist.com/" />
                <meta name="twitter:title" content="FileChemist" />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={""} />


                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#dbe3db" />
                <meta name="msapplication-TileColor" content="#dbe3db" />
                <meta name="theme-color" content="#dbe3db" />                

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet"></link>

                
                {props.headTags}
            </Head>

            <main className={props.className}>
                <Navbar />

                {props.children}

                <Footer />

                {
                    consentGiven == null && <CookieConsent />
                }
            </main>
    </div>

}
