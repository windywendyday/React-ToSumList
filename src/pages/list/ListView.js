import React, {useState} from "react";
import UserInfo from "./components/userInfo/UserInfo.js";
import ListContent from "./components/list/index.js";
import {Form, Input, Popup} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import './ListView.css'

export default function ListView() {
    const [popUpVisible, setPopUpVisible] = useState(false)
    function createNewItem() {

    }
    return (
        <div>
            <div className='header'>
                <UserInfo></UserInfo>
                <div className='button' onClick={() => setPopUpVisible(true)}>
                    <AddCircleOutline fontSize={36}/>
                </div>
            </div>
            <ListContent></ListContent>
            <Popup
                visible={popUpVisible}
                onMaskClick={() => setPopUpVisible(false)}
                bodyStyle={{ height: '50vh' }}
            >
                <Form layout='horizontal'>
                    <Form.Item label='事项名称' name='itemName'>
                        <Input placeholder='请输入事项名' clearable />
                    </Form.Item>
                </Form>
            </Popup>
        </div>
    )
}