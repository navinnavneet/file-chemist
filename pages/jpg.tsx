// react
import { useState, useEffect } from 'react';
// Templates
import BasicPage from '../components/templates/base_page'

// vieolo
import { Button } from '@vieolo/vieolo-ui'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

// component
import FileRowsStaticColumn from '../components/general/file_rows_static_column'

// utils
import { pdfMergerForImages } from '../utils/utils_pdf'
import { downloadFile, pdfConverter, imageCompressor, createZipFile, downloadMergedFile } from '../utils/utils_jpg'

type uploadedFile = {
	file: File,
	id: number,
	type: 'pdf' | 'jpg' | 'png'
}


export default function Jpg (props: {}) {
    const files: uploadedFile[] = useSelector((state: RootState) => state.app.files)

    const allJpgFiles: uploadedFile[] = files.filter(file => file.type === 'jpg')

    const [selectedFiles, setSelectedFiles] = useState < uploadedFile[] >([])

    const [compressedFiles, setCompressedFiles] = useState < Blob[] > ()

    const [pdfArr, setPdfArr] = useState([])

    const [finalPdf, setFinalPdf] = useState < Blob > ()

    useEffect(() => {
        setSelectedFiles(allJpgFiles)
    }, [])

    async function convertToPdf() {
        console.log('jpg convert to pdf')
        const newPdfFiles = await pdfConverter(allJpgFiles)
        setPdfArr(newPdfFiles)
    }

    async function mergeThePdf() {
        const finalPdf = await pdfMergerForImages(pdfArr)
        setFinalPdf(finalPdf)
    }

    function compressImages() {
        const newCompressedFiles = imageCompressor(selectedFiles)
        setCompressedFiles(newCompressedFiles)
    } 

    function downloadCompressedImages() {
        if(compressedFiles.length > 1) {
            createZipFile(compressedFiles)
        } 
        if (compressedFiles.length === 1) {
            for (let file of compressedFiles) {
                downloadFile(file, "fileChemist")
            }
        }
    }

    return (
        <BasicPage 
            className="jpg-page"
            headTags={[]}
            title="jpg/jpeg"
        >
            <div className="jpg-page__content">
                <h1>JPG/JPEG</h1>
                <section className="jpg-page__section">
                    <FileRowsStaticColumn
                        files={selectedFiles}
                    />
                    <Button 
                        text="Convert To PDF" 
                        size="medium" type="button" 
                        color="accessory-green"
                        onClick={convertToPdf}
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
                        onClick={() => downloadMergedFile(finalPdf, 'file-chemist-merged')}
                    />
                    <Button 
                        text="Compress the images" 
                        size="medium" type="button" 
                        color="accessory-green"
                        onClick={compressImages}
                    />
                    <Button 
                        text="Download compressed Images" 
                        size="medium" type="button" 
                        color="accessory-green"
                        onClick={downloadCompressedImages}
                    />
                </section>
            </div>
        </BasicPage>
    )
}
