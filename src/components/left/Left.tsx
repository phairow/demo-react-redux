import React, { useEffect } from 'react';
import './Left.css';
import { useSelector } from 'react-redux';
import {
  User,
  Identifiable,
} from 'pubnub-redux';
import {
  faCircle,
  faHashtag,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppState } from '../../store';
import {
  membershipSpacesSelector,
} from '../../selectors/membershipSelector';
import { usePubNub } from 'pubnub-react';

type LeftProps = {
  user: User,
  space: User,
  createChannel: Function
  joinChannel: Function
  selectChannel: Function
}

const Left: React.FC<LeftProps> = ({ user, space, createChannel, joinChannel, selectChannel }) => {
  const pubnub = usePubNub();
  const spaces = useSelector(membershipSpacesSelector(user));
  const isConnected = useSelector((state: AppState) => state.networkStatus.isConnected);

  let clickCreateChannel = (e: any) => {
    e.preventDefault();
    createChannel();
  }

  let clickJoinChannel = (e: any) => {
    e.preventDefault();
    joinChannel();
  }
  
  useEffect(() => {
    selectChannel(space && space.id !== '' ? space : spaces[0]);

    if (spaces !== undefined) {
      let channels: string[] = [ user.id ].concat(spaces.map((s: Identifiable) => s.id));

      pubnub.subscribe({
        channels: channels
      })
    }
  })

  return (
    <div className="Left">
      <div>
        <FontAwesomeIcon className={'NetworkStatus' + (isConnected ? ' connected' : '')} icon={faCircle} /> {user ? user.name : ''}
      </div>
      <ul className="GroupConversations">
        <li>
          <div className="SectionHeading">
            <a className="JoinChannel" href="#" onClick={clickJoinChannel}>Conversations</a>
            <a className="CreateChannel" href="#" onClick={clickCreateChannel}><FontAwesomeIcon className="GroupIcon" icon={faPlus} /></a>
          </div>
        </li>
        { spaces ? Object.values(spaces).map(function(space: any, index: any){
          return <li className="ConversationItem" key={ index }>
            {(space !== undefined) ? (
            <div>
              <FontAwesomeIcon className="GroupIcon" icon={faHashtag} />
              &nbsp; <a href="#" onClick={(e) => {
                selectChannel(space);
                e.preventDefault();
              }}>{space.name}</a>
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
