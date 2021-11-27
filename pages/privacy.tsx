// Button from @vieolo/vieolo-ui
import { Button } from '@vieolo/vieolo-ui'
// Templates
import BasicPage from '../components/templates/base_page'

export default function Privacy (props: {}) {
    return (
        <BasicPage 
            className="privacy-page"
            headTags={[]}
            title="Privacy"
        >
            <div className="privacy-page__content">
                <h1>Privacy</h1>
                <p>This web app does not collect any personal information from you and all the data that we receive from 
                    your machine is anonymous.</p>
                <p>We do not send any file uploaded to or modified within this web app to any server, including our own. All 
                    the processes and modifications occur in the browser, offline, and on your local machine. </p>
                <p>Upon your usage, we store your most used actions on your browser to improve your experience going 
                    forward. We do not collect your usage data and they are stored privately on your machine. To clear the 
                    collected usage data, please press the button below.</p>
                <Button 
                    text="Clear Usage Data" 
                    size="medium" type="button" 
                    color="accessory-green"
                />
                <p>We use cookies for necessary and optional functionalities of this website. Here, we'll give you all the 
                    details you need about   these cookies.</p>
                <p className="privacy-page__subheading">Necessary Cookies:</p>
                <p>
                    These are the cookies used for the basic functionalities and security of this website. We do not use 
                    these cookies to invade your privacy but to provide you with an acceptable and secure experience while
                    browsing the contents of this website.
                </p>
                <p className="privacy-page__subheading">Optional Cookies:</p>
                <p>
                    These are the cookies used for ensuring a better user experience, to gather feedback, and improve 
                    this website in the future. These cookies do not give us access to any of your personal information 
                    and all the data received on our end is entirely anonymous.
                </p>
                <p>
                    At the time, the only optional cookies that we use are for aggregated, anonymized website traffic
                    analysis. These cookies start with (_ga) and contain randomized and anonymous user id. This ID is
                    anonymized and contains no identifiable information like email, phone number, name, etc.
                    You have opted in to use these cookies. To opt-out, please click on the below button.
                </p>
                <Button 
                    text="Disable optional cookies" 
                    size="medium" type="button" 
                    color="accessory-green"
                />
                <p>
                    You have opted out of these cookies. To opt-in, please click on the below button.
                </p>
                <Button 
                    text="Allow optional cookies" 
                    size="medium" type="button" 
                    color="accessory-green"
                />
            </div>
        </BasicPage>
    )
}