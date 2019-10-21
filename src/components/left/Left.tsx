import React, { useState } from 'react';
import './Left.css';
import { useDispatch, useSelector } from 'react-redux';
import { usePubNub } from 'pubnub-react';
import {
  User
} from 'pubnub-redux';
import {
  faCircle,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppState } from '../../store';
import {
  membershipSpacesSelector,
} from '../../selectors/membershipSelector';

type LeftProps = {
  user: User,
}

const Left: React.FC<LeftProps> = ({ user }) => {
  const spaces = useSelector(membershipSpacesSelector(user));
  const isConnected = useSelector((state: AppState) => state.networkStatus.isConnected);

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
