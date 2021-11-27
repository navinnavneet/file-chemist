import { useState, useEffect } from "react"

export default function FileRowStatic (props: {
    file: File,
    type: string,
    id: number,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void
}) {

      const [preview, setPreview] = useState<string>(null)

  let fileName = props.file.name
  const fileType = props.type
  if (fileName.length > 15) {
    fileName = fileName.slice(0, 14) + "..."
  }
  const fileSize = Math.round(props.file.size / 1000)

  useEffect(() => {
    if (fileType === 'jpg' || fileType === 'png') {
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
            <div className="file-row" >
      <div className="file-row__thumbnail">
        { preview ? <img src={preview} style={{objectFit: 'cover', width: '64px', height: '64px', borderRadius: '6px'}} alt="" /> : null}
      </div>
      <h3 className="file-row__file-type">{fileType}</h3>
      <div className="file-row__file-info">
        <p>{fileName}</p>
        <p className="file-size">{fileSize} Kb</p>
      </div>
    </div>
    )
}