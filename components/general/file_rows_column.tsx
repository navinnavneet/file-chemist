
import { useSelector, useDispatch } from "react-redux";
import {
    dragEnter,
    dragStart,
    clearFileRow
} from '../../redux/appSlice';

import FileRow from "./file_row";

type uploadedFile = {
	file: File,
	id: number,
	type: 'pdf' | 'jpg' | 'png'
}

export default function FileRowsColumn (props: {
    files: uploadedFile[]
}) {

    const dispatch = useDispatch()
    

    return (
        <ul>
            {props.files.map((file, index) => {
                return <li
                    key={index}
                    draggable
                    onDragStart={() => dispatch(dragStart(index))}
                    onDragEnter={(e) => dispatch(dragEnter({event: e, index: index}))} 
                    onDragOver={(e) => e.preventDefault()}
                >
                <FileRow 
                    file={file.file} 
                    clicked={() => dispatch(clearFileRow(file.id))}
                />
            </li>
            })}
        </ul>
    )
}