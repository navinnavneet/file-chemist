// import from pdf-lib
import { PDFDocument } from 'pdf-lib'

// compressor js
import Compressor from 'compressorjs'

// jszip
import JSZip from 'jszip';

// imports from vieolo
import { fileToArrayBuffer } from '@vieolo/file-management'

type uploadedFile = {
    file: File,
    id: number,
    type: 'pdf' | 'jpg' | 'png'
}

// converting the jpg to pdf
export async function pdfConverter(files: uploadedFile[]) {
    const newPdfFiles: Uint8Array[] = []
    for (let file of files) {
        const jpgFile = file.file
        const jpgImageBytes = jpgFile.size
        console.log(jpgImageBytes)
        const pdfDoc = await PDFDocument.create()
        // Embed the JPG image bytes
        const jpgImage = await pdfDoc.embedJpg(await fileToArrayBuffer(jpgFile))
        // Get the width/height of the JPG image scaled down to 25% of its original size
        const jpgDims = jpgImage.scale(0.25)
        // Add a blank page to the document
        const page = pdfDoc.addPage()
        // Draw the JPG image in the center of the page
        page.drawImage(jpgImage, {
            x: page.getWidth() / 2 - jpgDims.width / 2,
            y: page.getHeight() / 2 - jpgDims.height / 2,
            width: jpgDims.width,
            height: jpgDims.height,
        })
        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()
        newPdfFiles.push(pdfBytes)
    }
    return newPdfFiles
}

//  compressing image files
export function imageCompressor (
    files: uploadedFile[],
) : Blob[] {
    const newCompressedFiles = [] as Blob[]
        for ( let f of files ) {
            if (!f.file) {
                return
            }
            new Compressor(f.file, {
                quality: 0.2,
                async success(result) {
                    const compressed = result
                    newCompressedFiles.push(compressed)
                },
                error(err) {
                    console.log(err.message)
                }
            })
        }
    return newCompressedFiles
}

// Download single blob
export function downloadFile (file: Blob, fileName?: string) {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, `${fileName}.jpg`);
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = `${fileName}.jpg`;
        a.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 0)
    }
}

// Download merged file
export function downloadMergedFile (file: Blob, fileName?: string) {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, `${fileName}.pdf`);
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = `${fileName}.pdf`;
        a.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 0)
    }
}

// create and download Zip file
export async function createZipFile (files: Blob[]) {
    let zip = new JSZip();
    if (files.length > 1) {
        files.forEach((file)=> {
            const name = file.name
            zip.file(name , file)
        })
        let blob = await zip.generateAsync({ type: "blob" });
        let zipName = `file-chemist.zip`;
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, zipName);
        } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = zipName;
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 0)
        }
    }
}

