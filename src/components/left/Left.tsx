import React from 'react';
import './Left.css';
import { User } from 'pubnub-redux';
import { useDispatch, useSelector } from 'react-redux';
import { usePubNub } from 'pubnub-react';
import {
  fetchSpaces,
  fetchUsers,
  createUser,
  fetchUserById,
} from 'pubnub-redux';

type LeftProps = {
  user?: User,
}

const Left: React.FC<LeftProps> = ({ user }) => {

  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const spaces = useSelector((state: any) => state.spaces.byId);

  dispatch(fetchSpaces(pubnub));

  return (
    <div className="Left">
      <div>
        {user ? user.name : ''}
      </div>
      <ul>
        { spaces ? Object.values(spaces).map(function(space: any, index: any){
          return <li key={ index }>{space.name}</li>;
        }) : []}
      </ul>
    </div>
  );
};

export default Left;
