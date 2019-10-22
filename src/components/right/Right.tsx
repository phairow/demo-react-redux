import React from 'react';
import './Right.css';
import { Space, leaveSpaces, User } from 'pubnub-redux';
import { useDispatch } from 'react-redux';
import { usePubNub } from 'pubnub-react';
// @ts-ignore-start 
import { useToasts } from 'react-toast-notifications';
// @ts-ignore-end

type RightProps = {
  user: User,
  space: Space,
};

const Right: React.FC<RightProps> = ({ user, space }) => {
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const { addToast } = useToasts();

  let leaveChannel = (id: string) => {
    console.log('leave', user.id, id)
    dispatch(leaveSpaces(pubnub, {
      userId: user.id,
      spaces: [ { id} ]
    }))
    addToast('Space \'' + id + '\' left.', { appearance: 'success' })
  }

  return (
    <div className="Right">
      { space !== undefined && space.id !== '' ? 
        <div>
          {space.name} <button onClick={ () => { leaveChannel(space.id); } }>Leave</button>
        </div>
      : 
        undefined
      }
    </div>
  );
};

export default Right;
