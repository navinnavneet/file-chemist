// Vieolo UI
import { FileInput } from '@vieolo/vieolo-ui';

// react-redux
import { useSelector, useDispatch } from 'react-redux'

// Templates
import BasicPage from '../components/templates/base_page'
import { useState, useEffect } from 'react';
import { RootState } from '../redux/store';
import {
  getFiles,
  clearAllFiles,
  createPossibleActions,

} from '../redux/appSlice'


// icons from material-ui
import { 
  InsertDriveFileSharp,
  ClearAllSharp
} from '@material-ui/icons';

// components
import FileRowsColumn from '../components/general/file_rows_column';

import AvailableAction from '../components/general/available_action';

import Card from '../components/general/link_card';




export default function Home() {

  const files = useSelector((state: RootState) => state.app.files)

  const possibleActions = useSelector((state: RootState) => state.app.possibleActions)

  const dispatch = useDispatch()

  const linkCards = [
    {title: 'PDF', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eveniet', link: '/pdf'},
    {title: 'JPEG/JPG', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eveniet', link: '/jpg'},
    {title: 'PNG', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eveniet', link: '/png'},
  ]

  useEffect(() => {
    dispatch(createPossibleActions())
  }, [files])


  return (
    <BasicPage 
      className="home-page"
      headTags={[]}
      title="FileChemist"
    >
      <div className="home-page__grid-four-column">
        <div className="home-page__title">
          <h1>PDF | JPG | PNG</h1>
          <p>Convert, Merge, Resize, Split and many more...</p>
        </div>
        <div className="home-page__file-input">
          <FileInput 
            onChange={(e) => dispatch(getFiles(e))}
            onError={() => {}}
            text="Drop Your Files Here and We'll Figure out the rest"
            icon={<InsertDriveFileSharp />}
          />
        </div>
        <div className="home-page__security">
          <h2>Your files are secure!</h2>
          <p>Your files do not leave this webpage. Every process is done offline and on your own machine. We don't send your file to any server, including our own. You can even go ahead and disconnect your internet!</p>
        </div>
        <div className="home-page__advertisement-left">
          Advertisement
        </div>
        <div className="home-page__selected-files"> 
          <div className="home-page__container-title">
            <p>Selected Files</p>
            <button 
              className="btn-fun"
              onClick={() => dispatch(clearAllFiles())}
            >
              <ClearAllSharp />
            </button>
          </div>
          <FileRowsColumn 
            files={files}
          />
        </div>
        <div className="home-page__available-actions-container">
          <div className="container-title">
            <p>Available Actions</p>
          </div>
          {possibleActions && possibleActions
                              .filter((action, index) => possibleActions.indexOf(action) === index)
                              .map((action, index) => <AvailableAction key={index} text={action} />)}
        </div>
        <div className="home-page__advertisement-right">
          Advertisement
        </div>
      </div>

      <div className="home-page__link-card-container">
        {linkCards.map(linkCard => {
          return <Card 
            key={linkCard.title}
            title={linkCard.title}
            text={linkCard.text}
            link={linkCard.link}
          />
        })}
      </div>

    </BasicPage>
  )
}


