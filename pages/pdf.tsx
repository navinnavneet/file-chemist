// Templates
import BasicPage from '../components/templates/base_page'
// react
import { useState } from 'react'
// redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'



// imports from vieolo
import { Button } from '@vieolo/vieolo-ui'

// component
import FileRowsStaticColumn from '../components/general/file_rows_static_column'

// utils
import { downloadFile, pdfMergerForPdf, pdfSplitter } from '../utils/utils_pdf'
import { createZipFile } from '../utils/utils_jpg'


type uploadedFile = {
	file: File,
	id: number,
	type: 'pdf' | 'jpg' | 'png'
}


export default function Pdf (props: {}) {
    const files: uploadedFile[] = useSelector((state: RootState) => state.app.files)

    const [finalPdf, setFinalPdf] = useState<Blob>()

    const [splittedPdfs, setSplittedPdfs] = useState <{file: Blob, name: string}[]>([])
    
    const allPdfUploadedFiles: uploadedFile[] = files.filter(file => file.type === 'pdf')

    async function mergeThePdf() {
        console.log('Merging pdf files...') /*placehoder for a spinner*/ 
        const allPdfFiles: File[] = allPdfUploadedFiles.map(uploadedFile => uploadedFile.file)
        const finalPdf = await pdfMergerForPdf(allPdfFiles)
        setFinalPdf(finalPdf)
    }

    async function splitPdf() {
        const splittedFiles = await pdfSplitter(files[0].file)
        setSplittedPdfs(splittedFiles)
    }

    function downloadSplittedFiles() {
        const files = []
        for (let file of splittedPdfs) {
            files.push(file.file)
        }
        createZipFile(files)
    }
    
    return (
        <BasicPage 
            className="pdf-page"
            headTags={[]}
            title="pdf"
        >
            <div className="pdf-page__content">
                <h1>PDF</h1>
                <section className="pdf-page__section">
                    <FileRowsStaticColumn 
                        files={allPdfUploadedFiles}
                    />
                    <Button 
                        text="Merge The PDF Files" 
                        size="medium" type="button" 
                        color="accessory-green"
                        onClick={mergeThePdf}
                    />
                    <Button 
                        text="Download The Merged Pdf" 
                        size="medium" type="button" 
                        color="accessory-green"
                        onClick={() => downloadFile(finalPdf, 'file-chemist-merged')}
                    />
                    <Button 
                        text="Split The Pdf" 
                        size="medium" type="button" 
                        color="accessory-green"
                        onClick={splitPdf}
                    />
                    <Button 
                        text="Download The Splitted Files" 
                        size="medium" type="button" 
                        color="accessory-green"
                        onClick={downloadSplittedFiles}
                    />
                </section>
            </div>
        </BasicPage>
    )
}
