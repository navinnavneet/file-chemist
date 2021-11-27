import {
  InfoSharp,
  SettingsBackupRestoreSharp
} from '@material-ui/icons';


export default function AvailableAction (props: {
    text: string
}) {
  return (
    <div className="available-action">
      <div className="available-action__left">
        <SettingsBackupRestoreSharp />
        <div className="available-action__action-text">
          <p>{props.text}</p>
        </div>
      </div>
      <InfoSharp />
    </div>
  )
}