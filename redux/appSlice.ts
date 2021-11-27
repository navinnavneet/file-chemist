// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit'



const actionsMap: {[fileType: string]: {
	actionDisplay: {[language: string]: string},
    actionId: string,
	minNoFiles?: number,
}[]} =  {
    pdf: [
        {
            actionDisplay: {
	            en: 'Split To JPG'
            },
            actionId: 'pdf split jpg',
        },
        {
            actionDisplay: {
	            en: 'Resize the PDF'
            },
            actionId: 'resize the pdf',
        },
        {
            actionDisplay: {
	            en: 'Split To PNG'
            },
            actionId: 'pdf split png',
        },
        {
            actionDisplay: {
	            en: 'Merge The PDF Files'
            },
            actionId: 'merge pdf files',
            minNoFiles: 2
        },
    ],
    jpg: [
        {
            actionDisplay: {
	            en: 'Convert To PNG'
            },
            actionId: 'jpg convert to png',
        },
        {
            actionDisplay: {
	            en: 'Convert To PDF'
            },
            actionId: 'jpg convert to pdf',
        },
        {
            actionDisplay: {
	            en: 'Compress The Image'
            },
            actionId: 'jpg compress image',
        },
    ],
    png: [
        {
            actionDisplay: {
	            en: 'Convert To JPG'
            },
            actionId: 'png convert jpg',
        },
        {
            actionDisplay: {
	            en: 'Convert To PDF'
            },
            actionId: 'png convert pdf',
        },
        {
            actionDisplay: {
	            en: 'Compress The Image'
            },
            actionId: 'png compress image',
        },
    ]
}


type uploadedFile = {
	file: File,
	id: number,
	type: 'pdf' | 'jpg' | 'png'
}


const appSlice = createSlice({
	name: 'app',
	initialState: {
		cookieConsentGiven: null as boolean,
		files: [] as uploadedFile[],
        possibleActions: [],
		dragRow: 0,
        language: 'en'

	},
	reducers: {
        setCookieConsent(state, action: PayloadAction<boolean>) {
            state.cookieConsentGiven = action.payload;
			if (action.payload != null) {
				let now = new Date();
            	document.cookie = `consentGiven=${action.payload ? "true" : "false"}; Path=/; Expires=${new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).toUTCString()};`;
				(window as any).gtag('consent', 'update', {
					'analytics_storage': action.payload ? 'granted' : 'denied'
				});
				if (!action.payload) {
					document.cookie = `_ga=${""}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
					document.cookie = `_gid=${""}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
				}
			}            
        },


		createPossibleActions(state) {
            const updatedPossibleActions: string[] = []
            let numPdf = 0
            state.files.forEach(file => {
                if (file.type === 'pdf') {
                    numPdf++
                }
                const newPossibleActions: string[] = []
                actionsMap[file.type].forEach(action => {
                    if (!action.minNoFiles) {
                        newPossibleActions.push(action.actionDisplay.en)
                    } else if (numPdf >= action.minNoFiles) {
                        newPossibleActions.push(action.actionDisplay.en)
                    }
                })
                updatedPossibleActions.push(...newPossibleActions)
            })
            state.possibleActions = updatedPossibleActions
        },
        getFiles(state, action) {
            const file = action.payload['0']
            let id
            if (state.files.length) {
            id = state.files[state.files.length - 1].id + 1
            } else {
            id = 1
            }
            let newFileType = file.name.split('.')[1]
            if (newFileType === 'jpeg') {
                newFileType = 'jpg'
            }
            const uploadedFile = {
                file: file,
                id: id,
                type: newFileType
            }
            const newFiles = [...state.files]
            newFiles.push(uploadedFile)
            state.files = newFiles
        },
        clearFileRow: (state, action) => {
            console.log('clearFileRow')
            console.log(action.payload)
            const newFiles = state.files.filter(file => action.payload !== file.id)
            state.files = newFiles
        },
        clearAllFiles(state) {
            state.files = []
            state.possibleActions = []
        },
        dragStart(state, action) {
            state.dragRow = action.payload
        },
        dragEnter(state, action) {
            const newFiles = [...state.files];
            const row = newFiles[state.dragRow];
            newFiles.splice(state.dragRow, 1);
            newFiles.splice(action.payload.index, 0, row);
            state.dragRow = action.payload.index;
            state.files = newFiles;
        }
	}
})


export const { setCookieConsent,
	getFiles, 
    createPossibleActions, 
    clearAllFiles, 
    clearFileRow, 
    dragStart,
    dragEnter } = appSlice.actions;

export default appSlice.reducer;