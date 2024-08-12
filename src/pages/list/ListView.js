import React, {useRef, useState} from "react";
import UserInfo from "./components/userInfo/UserInfo.js";
import ListContent from "./components/list/index.js";
import {Button, CalendarPicker, Form, Input, Popup, Stepper} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import './ListView.css'
import dayjs from "dayjs";
import axios from "axios";

export default function ListView() {
    const [popUpVisible, setPopUpVisible] = useState(false)
    const [datePickerVisible, setDatePickerVisible] = useState(false)
    const singleDate= null
    const [dateVal, setDateVal] = useState(new Date())
    const [form] = Form.useForm()
    const childRef = useRef();

    async function createNewItem() {
        const formData = form.getFieldsValue()
        formData.itemDeadline = dateVal
        console.log('formData',formData)
        const res = await axios.post('/postTodo', {
            uid: 1,
            itemName: formData.itemName,
            itemDeadline: formData.itemDeadline,
            needCheckInDays: formData.needCheckInDays,
        })
        console.log(res)
        setPopUpVisible(false)
        await childRef.current.getItemList()
    }

    return (
        <div className='listView'>
            <div className='header'>
                <UserInfo></UserInfo>
                <div className='button' onClick={() => setPopUpVisible(true)}>
                    <AddCircleOutline fontSize={36}/>
                </div>
            </div>
            <ListContent ref={childRef}></ListContent>
            <div className='popUp'>
                <Popup
                    visible={popUpVisible}
                    onMaskClick={() => setPopUpVisible(false)}
                    bodyStyle={{ minHeight: '50vh', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', }}
                >
                    <Form layout='horizontal' form={form}>
                        <Form.Header>新建事项</Form.Header>
                        <Form.Item label='事项名称' name='itemName'>
                            <Input placeholder='请输入事项名' clearable />
                        </Form.Item>
                        <Form.Item label='截止时间' name='itemDeadline'>
                            <Input onClick={() => setDatePickerVisible(true)} name='dateVal' value={dayjs(dateVal).format('YYYY-MM-DD')}/>
                            <div className='datePicker'>
                                <CalendarPicker
                                    visible={datePickerVisible}
                                    selectionMode='single'
                                    defaultValue={singleDate}
                                    onClose={() => setDatePickerVisible(false)}
                                    onMaskClick={() => setDatePickerVisible(false)}
                                    onConfirm={val => {
                                        setDateVal(val)
                                        console.log('date:', dateVal)
                                    }}
                                />
                            </div>
                        </Form.Item>
                        <Form.Item
                            label='需打卡时间'
                            name='needCheckInDays'
                            childElementPosition='right'
                            initialValue={1}
                            rules={[
                                {
                                    max: 999,
                                    min: 1,
                                    type: 'number',
                                },
                            ]}
                        >
                            <Stepper />
                        </Form.Item>
                    </Form>
                    <Button block color='primary' className='confirmButton' onClick={() => createNewItem()}>
                        确认新建
                    </Button>
                </Popup>
            </div>
        </div>
    )
}