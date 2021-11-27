// react
import { useState, useEffect } from 'react';
// Templates
import BasicPage from '../components/templates/base_page'

import { Button } from '@vieolo/vieolo-ui'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

// component
import FileRowsStaticColumn from '../components/general/file_rows_static_column'

// utils
import {  pdfMergerForImages } from '../utils/utils_pdf'
import { downloadFile, pdfConverter, downloadMergedFile } from '../utils/utils_png'
import { imageCompressor, createZipFile } from '../utils/utils_jpg'

type uploadedFile = {
	file: File,
	id: number,
	type: 'pdf' | 'jpg' | 'png'
}

export default function Png (props: {}) {
    const files: uploadedFile[] = useSelector((state: RootState) => state.app.files)

    const allPngFiles: uploadedFile[] = files.filter(file => file.type === 'png')

    const [pdfArr, setPdfArr] = useState < Uint8Array[] > ([])

    const [finalPdf, setFinalPdf] = useState < Blob > ()

    const [selectedFiles, setSelectedFiles] = useState < uploadedFile[] >([])

    const [compressedFiles, setCompressedFiles] = useState < Blob[] > ()

    useEffect(() => {
        setSelectedFiles(allPngFiles)
    }, [])

    // convert to pdf
    async function convertToPdf() {
        const newPdfFiles = await pdfConverter(allPngFiles)
        setPdfArr(newPdfFiles)
    }

    // merge pdf files
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
                downloadFile(file, 'fileChemist')
            }
        }
    }


    return (
        <BasicPage 
            className="jpg-page"
            headTags={[]}
            title="png"
        >
            <div className="jpg-page__content">
                <h1>PNG</h1>
                <section className="jpg-page__section">
                    <FileRowsStaticColumn
                        files={allPngFiles}
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
                        onClick={() => downloadMergedFile(finalPdf, 'merged')}
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
