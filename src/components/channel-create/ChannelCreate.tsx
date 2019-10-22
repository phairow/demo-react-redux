import React, {
  useState,
} from 'react';
import './ChannelCreate.css';
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';
import { usePubNub } from 'pubnub-react';
import { createSpace, User } from 'pubnub-redux';
// @ts-ignore-start 
import { useToasts } from 'react-toast-notifications';
// @ts-ignore-end

type ChannelCreateProps = {
  hide: Function;
};

const ChannelCreate: React.FC<ChannelCreateProps> = ({ hide }) => {
  const [spaceName, setSpaceName] = useState('');
  const [spaceDescription, setSpaceDescription] = useState('');
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const { addToast } = useToasts();

  let clickHide = (e: any) => {
    e.preventDefault();
    hide();
  }

  let updateSpaceName = (e:  React.FormEvent<HTMLInputElement>) => {
    setSpaceName(e.currentTarget.value);
  }

  let updateSpaceDescription = (e:  React.FormEvent<HTMLInputElement>) => {
    setSpaceDescription(e.currentTarget.value);
  }

  let createChannel = () => {
    if (spaceName) {
      dispatch(createSpace(pubnub, {
        id: spaceName,
        name: spaceName,
        description: spaceDescription
      }));

      addToast('Space \'' + spaceName + '\' created.', { appearance: 'success' })

      hide();
    }
  }

  return (
    <div className="ChannelCreate">
      <div>
        Create Channel
        <a className="Close" href="#" onClick={clickHide}><FontAwesomeIcon className="GroupIcon" icon={faTimes} /></a>
      </div>
      <div className='CreateChannelForm'>
        <label>
          Name
          <input
            value={spaceName}
            onChange={updateSpaceName}
          />
        </label>
        <br />
        <br />
        <label>
          Description
          <input
            value={spaceDescription}
            onChange={updateSpaceDescription}
          />
        </label>
        <br />
        <br />
        <button onClick={createChannel}>go</button>
      </div>
    </div>
  );
};

export default ChannelCreate;
