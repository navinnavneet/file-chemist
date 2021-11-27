// import from vieolo
import { fileToArrayBuffer } from "@vieolo/file-management";

// pdf-lib
import { PDFDocument } from "pdf-lib";

// jszip
import JSZip from "jszip";

// photon
import photon from "@silvia-odwyer/photon";

// Download blob
export function downloadFile(file: Blob, fileName?: string) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, `${fileName}.pdf`);
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = `${fileName}.pdf`;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}

// Merge Pdf for pdf page
export async function pdfMergerForPdf(files: File[]) {
  const mergedPdf = await PDFDocument.create();
  for (let f of files) {
    // Loading the image
    let document: PDFDocument = await PDFDocument.load(
      await fileToArrayBuffer(f)
    );
    const copiedPages = await mergedPdf.copyPages(
      document,
      document.getPageIndices()
    );
    // Add pages to the PDF document
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  let blob = new Blob([await mergedPdf.save()]);
  return blob;
}

// Merge Pdf for images
export async function pdfMergerForImages(files: Uint8Array[]) {
  const mergedPdf = await PDFDocument.create();
  for (let f of files) {
    // Loading the image
    let document: PDFDocument = await PDFDocument.load(f);
    const copiedPages = await mergedPdf.copyPages(
      document,
      document.getPageIndices()
    );
    // Add pages to the PDF document
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  let blob = new Blob([await mergedPdf.save()]);
  return blob;
}

// spiliting pdf
export async function pdfSplitter(file: File) {
  const splittedPdf: { file: Blob; name: string }[] = [];
  const fileName = file.name.split(".")[0];
  // Loading the image
  const document: PDFDocument = await PDFDocument.load(
    await fileToArrayBuffer(file)
  );

  const numberOfPages = document.getPages().length;

  for (let i = 0; i < numberOfPages; i++) {
    // console.log(pages[i])
    const pdfDoc: PDFDocument = await PDFDocument.create();
    const [firstDonorPage] = await pdfDoc.copyPages(document, [i]);
    pdfDoc.addPage(firstDonorPage);
    const blob = new Blob([await pdfDoc.save()], { type: "pdf" });
    splittedPdf.push({ file: blob, name: fileName + `${i + 1}` });
  }
  return splittedPdf
}

// create and download Zip file
export async function createZipFile(files: { file: Blob; name: string }[]) {
  let zip = new JSZip();
  if (files.length > 1) {
    files.forEach((f) => {
      const name = f.name;
      zip.file(name, f.file);
    });
    let blob = await zip.generateAsync({ type: "blob" });
    let zipName = `file-chemist.zip`;
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, zipName);
    } else {
      const a = document.createElement("a");
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = zipName;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    }
  }
}
/*
function filterImage(newimg: ) {
    // Create a canvas and get a 2D context from the canvas
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext("2d");

    // Draw the image element onto the canvas
    ctx.drawImage(newimg, 0, 0);

    // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
    let image = photon.open_image(canvas, ctx);

    // Filter the image, the PhotonImage's raw pixels are modified
    photon.filter(image, "radio");

    // Place the modified image back on the canvas
    photon.putImageData(canvas, ctx, image);
}
*/
