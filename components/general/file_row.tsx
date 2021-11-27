import { useState, useEffect } from 'react'

import { 
  ClearSharp,
  DragHandleSharp,
  
} from '@material-ui/icons';

export default function FileRow(props: {
    file,
    clicked
}) {

  const [preview, setPreview] = useState<string>(null)

  let fileName = props.file.name
  const fileType = fileName.split('.')[1]
  if (fileName.length > 15) {
    fileName = fileName.slice(0, 14) + "..."
  }
  const fileSize = Math.round(props.file.size / 1000)

  useEffect(() => {
    if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(props.file)
    } else {
      setPreview('')
    }
  }, [])

  return (
    <div className="file-row">
      <div className="file-row__thumbnail">
        { preview ? <img src={preview} style={{objectFit: 'cover', width: '64px', height: '64px', borderRadius: '6px'}} alt="" /> : null}
      </div>
      <h3 className="file-row__file-type">{fileType}</h3>
      <div className="file-row__file-info">
        <p>{fileName}</p>
        <p className="file-size">{fileSize} Kb</p>
      </div>
      <div className="file-row__btn-fun-container">
        <button onClick={() => props.clicked(props.file.id)}
          className="btn-fun"
        >
          <ClearSharp />
        </button>
        <button className="btn-fun">
          <DragHandleSharp />
        </button>
      </div>
    </div>
  )
}