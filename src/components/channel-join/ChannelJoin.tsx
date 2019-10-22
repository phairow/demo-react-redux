import React, {
  useState,
} from 'react';
import './ChannelJoin.css';
import {
  faTimes,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { usePubNub } from 'pubnub-react';
import {
  fetchSpaces,
  joinSpaces,
  User,
} from 'pubnub-redux';
import {
  allSpacesSelector,
} from '../../selectors/spaceSelector';
// @ts-ignore-start 
import { useToasts } from 'react-toast-notifications';
// @ts-ignore-end

type ChannelJoinProps = {
  hide: Function;
  user: User;
};

const ChannelJoin: React.FC<ChannelJoinProps> = ({ hide, user }) => {
  const [spacesFetched, setSpacesFetched] = useState(false);
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const { addToast } = useToasts();
  const spaces = useSelector(allSpacesSelector);

  let clickHide = (e: any) => {
    e.preventDefault();
    hide();
  }

  let joinChannel = (id: string) => {
    dispatch(joinSpaces(pubnub, {
      userId: user.id,
      spaces: [ { id} ]
    }))
    addToast('Space \'' + id + '\' joined.', { appearance: 'success' })
  }

  if (!spacesFetched) {
    setSpacesFetched(true);
    dispatch(fetchSpaces(pubnub));
  }

  return (
    <div className="ChannelJoin">
      <div>
        Join Channel
        <a className="Close" href="#" onClick={clickHide}><FontAwesomeIcon className="GroupIcon" icon={faTimes} /></a>
      </div>
      <div className='JoinChannelForm'>
        <ul className="GroupConversations">
          { spaces ? Object.values(spaces).map(function(space: any, index: any){
            return <li className="ConversationItem" key={ index }>
              {(space !== undefined) ? (
              <div>
                <FontAwesomeIcon className="GroupIcon" icon={faHashtag} />
                &nbsp; {space.name}
                <button onClick={ () => { joinChannel(space.id); } }>Join</button>
              </div>
              ) : (
                <div> Loading...</div>
              )}
            </li>;
          }) : []}
        </ul>
      </div>
    </div>
  );
};

export default ChannelJoin;
