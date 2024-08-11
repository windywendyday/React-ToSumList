import React from "react";
import { Avatar } from 'antd-mobile'
import avatar from '../../../../assets/avatar.jpg'
import { AddCircleOutline } from 'antd-mobile-icons'
import './UserInfo1.css';

export default function UserInfo() {
    const userName = 'Huihui'

    return (
        <div className='userInfo'>
            <div className='avatar'>
                <Avatar src={avatar} style={{ '--size': '60px', '--border-radius': '24px' }}></Avatar>
            </div>
            <div className='user-name'>Hi, { userName }</div>
        </div>
    )
}