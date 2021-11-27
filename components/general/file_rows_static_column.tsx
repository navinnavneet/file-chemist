import { useEffect } from "react"
import FileRowStatic from "./file_row_static"

type uploadedFile = {
    file: File,
    id: number,
    type: 'pdf' | 'jpg' | 'png'
}

export default function FileRowsStaticColumn (props: {
    files: uploadedFile[],
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) {

    return (
        <ul className="file-row-static-column">
            {props.files.map((file: uploadedFile, index) => {
                return <li
                    key={file.id}
                >
                <FileRowStatic 
                    file={file.file} 
                    type={file.type}
                    id={file.id}
                    onClick={props.onClick}
                />
            </li>
            })}
        </ul>
    )
}