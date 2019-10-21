import React, { useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import './Left.css';
import { useDispatch, useSelector } from 'react-redux';
import { usePubNub } from 'pubnub-react';
import {
  User,
  fetchSpaces,
  fetchUsers,
  createUser,
  fetchUserById,
  fetchMemberships,
  fetchSpaceById,
} from 'pubnub-redux';
import {
  faCircle,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statement } from '@babel/template';
import { AppState } from '../../store';

type LeftProps = {
  user: User,
}

let membershipSelector = (user: User) => (state: AppState) => {
    return state.membership.byId[user.id];
};

let spacesSelector = (state: AppState) => {
  return state.spaces.byId;
};

let membershipSpacesSelector = (user: User) => createSelector([membershipSelector(user), spacesSelector], (membership, spaces) => {
  return membership !== undefined ? membership.map((m: any) => spaces[m.id]) : [];
});

const Left: React.FC<LeftProps> = ({ user }) => {
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const [membershipInit, setMembershipInit] = useState(false);
  const [spacesInit, setSpacesinit] = useState(false);
  const membership = useSelector(membershipSelector(user));
  const spaces = useSelector(membershipSpacesSelector(user));
  const isConnected = useSelector((state: any) => state.networkStatus.isConnected);


  if (user !== undefined) {
    if (!membershipInit) {
      console.log('fetch memberships')
      setMembershipInit(true);
      dispatch(fetchMemberships(pubnub, user.id));
    }

    if (!spacesInit && membership !== undefined) {
      console.log('fetch spaces')
      setSpacesinit(true);
      for(let i = 0; i < membership.length; i++) {
        dispatch(fetchSpaceById(pubnub, membership[i].id));
      }
    }
  }

  return (
    <div className="Left">
      <div>
        <FontAwesomeIcon className={'NetworkStatus' + (isConnected ? ' connected' : '')} icon={faCircle} /> {user ? user.name : ''}
      </div>
      <ul className="GroupConversations">
        <li>
          <div className="SectionHeading">
            Conversations
          </div>
        </li>
        { spaces ? Object.values(spaces).map(function(space: any, index: any){
          return <li className="ConversationItem" key={ index }>
            {(space !== undefined) ? (
            <div>
              <FontAwesomeIcon className="GroupIcon" icon={faHashtag} />
              &nbsp; {space.name}
            </div>
            ) : (
              <div> Loading...</div>
            )}
          </li>;
        }) : []}
      </ul>
      <ul className="DirectMessages">
        <li>
          <div className="SectionHeading">
            Direct Messages
          </div>
        </li>
          {/* { spaces ? Object.values(spaces).map(function(space: any, index: any){
          return <li className="ConversationItem" key={ index }>
              {(space !== undefined) ? (
              <div>
                <FontAwesomeIcon className="GroupIcon" icon={faHashtag} />
                &nbsp; {space.name}
              </div>
              ) : (
                <div> Loading...</div>
              )}
            </li>;
          }) : []} */}
      </ul>
    </div>
  );
};

export default Left;
