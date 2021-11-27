// Templates
import BasicPage from '../components/templates/base_page'


export default function Environment (props: {}) {
    return (
        <BasicPage 
            className="environment-page"
            headTags={[]}
            title="Environmental Impact"
        >
            <div className="environment-page__content">
                <h1>Environmental Impact</h1>
                <p>
                    We are committed to reducing our carbon footprint and play our part in fighting climate change. 
                    As a part of this commitment, we use our servers as little as possible to minimize the used 
                    electricity and carbon emissions. All the processes and calculations required for the functionalities
                    of this web application happens on your local machine. We continuously work on improving the performance 
                    of this web application to reduce the computational power of the users. Even though these optimizations may 
                    seem negligible, they add up to a huge amount of saved time and emissions when used by millions of people 
                    across the globe.
                </p>
            </div>
        </BasicPage>
    )
}