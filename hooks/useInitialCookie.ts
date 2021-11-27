import { useEffect } from 'react';
import { setCookieConsent } from '../redux/appSlice';
import { useDispatch } from 'react-redux';
import { getCookies } from '../utils/cookies';


function hasGivenCookieConsent() : boolean {
    let cookies = getCookies();
    
    if ("consentGiven" in cookies && cookies.consentGiven == "true") return true;
    else if ("consentGiven" in cookies && cookies.consentGiven == "false") return false;
    return null;
}


export default function useInitialCookie() {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCookieConsent(hasGivenCookieConsent()));
    }, []);
}