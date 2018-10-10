import React, { Component } from 'react';
import '../../scss/App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import {
    PATH_BASE,
    PATH_USERS,
    PATH_STREAM,
    config
} from '../../constants/index';

import { Header } from '../Header/Header';
import { Button } from '../Button/Button';
import { List } from '../List/List';


class TwitchApp extends Component {
    constructor(props){
        super(props);
        this.handleOnlineUsers = this.handleOnlineUsers.bind(this);
        this.handleOfflineUsers = this.handleOfflineUsers.bind(this);
        this.handleBothUsers = this.handleBothUsers.bind(this);
        this.setUsersData = this.setUsersData.bind(this);
        this.getData = this.getData.bind(this);
        this.handleReload = this.handleReload.bind(this);

        this.state = {
           users: ["dawoodshahat", "sacriel", "callofduty", "yogscast", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "noobs2ninjas"],
           focusedButton: 'both',
           results: null,
           error: null,
           isReloadClicked: false
        };
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        const { users } = this.state;
        users.forEach(user => {
            axios(`${PATH_BASE}${PATH_USERS}/${user}`, config)
            .then(responseFirst => {
                axios(`${PATH_BASE}${PATH_STREAM}/${user}`, config)
                .then(responseSecond => this.setUsersData(responseFirst.data, responseSecond.data))
            .catch(error => this.setState({ error: error }))
            })
            .catch(error => this.setState({ error: error }));
        });
    }

    setUsersData(userData, streamData){
        this.setState(prevState => {
            // if results is set to null
            if(!prevState.results){
                return {
                    results: [{
                        user: userData,
                        stream: streamData
                    }]
                }
            }else {
                return {
                    results: [...prevState.results, {
                            user: userData,
                            stream: streamData
                    }]
                }

            }
        }, () => this.setState({isReloadClicked: false}));

    }

    handleOnlineUsers(e){
        this.setState({focusedButton: 'online'});
    }

    handleOfflineUsers(e){
        this.setState({focusedButton: 'offline'});
    }

    handleBothUsers(e){
        this.setState({focusedButton: 'both'});
    }

    handleReload(e){

        // you don't have to refresh the whole app
        // if usersData is not loaded properly
        this.setState(prevState => {
            return {
                isReloadClicked: true,
                results: null
            };
        }, () => this.getData());
    }

    render() {

        const { focusedButton, results, isReloadClicked } = this.state;
        const list = !this.state.results ? [] : results;

        return (
            <div className="container">
                <Header title="Twitch Streamers" />
                <div className='btn-panel'>
                    <Button
                        buttonName='Online'
                        className={`btn-status ${focusedButton === 'online' ? 'active' : ''}`}
                        handleClick={this.handleOnlineUsers}
                    />
                    <Button
                        buttonName='Offline'
                        className={`btn-status ${focusedButton === 'offline' ? 'active' : ''}`}
                        handleClick={this.handleOfflineUsers}
                    />
                    <Button
                        buttonName='Both'
                        className={`btn-status ${focusedButton === 'both' ? 'active' : ''}`}
                        handleClick={this.handleBothUsers}
                    />
                </div>
                <div className="adduser-reload">
                    <input className="username" type="text" placeholder="Username"></input>
                    <Button
                        buttonName={
                            <FontAwesomeIcon
                             icon={faSync}
                             size='4x'
                             className={`reload-icon ${isReloadClicked ? 'reload-icon-active' : ''}`}
                            />
                        }
                        className='btn-reload'
                        handleClick={this.handleReload}
                    />

                </div>
                <div className="user-section">
                    <List focusedButton={focusedButton} list={list}/>
                </div>
            </div>
        );
    }
}

export default TwitchApp;
