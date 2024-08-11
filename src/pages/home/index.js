import React from 'react';
import ListView from "../../pages/list/ListView.js";
import { TabBar} from 'antd-mobile'
import {CalendarOutline, SetOutline, UnorderedListOutline} from "antd-mobile-icons";
import {Route, Router, Routes, useLocation, useNavigate,} from "react-router-dom";
import Settings from "../settings/index.js";
import Statistics from "../statistics/index.js";
import './index.css'

const Bottom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const setRouteActive = (value) => {
        navigate(value);
    };
    const tabs = [
        {
            key: '/home/listview',
            title: '待办',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/home/statistics',
            title: '统计',
            icon: <CalendarOutline />,
        },
        {
            key: '/home/settings',
            title: '设置',
            icon: <SetOutline />,
        },
    ]

    return (<TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
        {tabs.map(item => (<TabBar.Item key={item.key} icon={item.icon} title={item.title}/>))}
    </TabBar>);
}

export default function Home() {

    return(
        <div className='body'>
            <Routes>
                <Route exact path='listview' element={<ListView />} />
                <Route exact path='statistics' element={<Statistics />} />
                <Route exact path='settings' element={<Settings />} />
            </Routes>
            <div className='bottom'>
                <Bottom/>
            </div>
        </div>
    )
}