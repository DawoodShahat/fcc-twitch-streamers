import React from 'react';
import { UserTab } from '../UserTab/UserTab';

export function List(props){
    const { list, focusedButton } = props;
    const listItems = list.map(item => {

        let doesUserBelongToCategory = '';
        if(focusedButton === 'online'){
            if(!item.stream.stream){
                doesUserBelongToCategory = 'hidden';
            }else {
                doesUserBelongToCategory = 'show';
            }
        }else if (focusedButton === 'offline'){
            if(!item.stream.stream){
                doesUserBelongToCategory = 'show';
            }else {
                doesUserBelongToCategory = 'hidden';
            }
        }


        return (
            <UserTab
                key={item.user._id}
                imgSource={item.user.logo}
                displayName={item.user.display_name}
                channelURL={`https://www.twitch.tv/${item.user.name}`}
                description={`${!item.stream.stream ? 'not playing anything' : item.stream.stream.game}`}
                className={`${!item.stream.stream ? 'offline' : 'online'} ${doesUserBelongToCategory}`}
            />
        )
    });

    return listItems;
}
