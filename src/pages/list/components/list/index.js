import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import { List } from 'antd-mobile'
import axios from "axios";

export default forwardRef(function ListContent(props, ref) {
    // const itemList = [
    //     {
    //         itemId: 0,
    //         itemName: '11点前睡觉',
    //         lastDays: 5,
    //         remainDays: 8,
    //     },
    //     {
    //         itemId: 1,
    //         itemName: '每天去健身',
    //         lastDays: 6,
    //         remainDays: 8,
    //     },
    //     {
    //         itemId: 2,
    //         itemName: '不吃晚饭',
    //         lastDays: 6,
    //         remainDays: 8,
    //     },
    // ]
    let [itemList, setItemList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getItemList()
        }
        fetchData()
            // 确保捕获任何错误
            .catch(console.error);
    }, []);

    useImperativeHandle(ref, () => {
        // 需要将暴露的接口返回出去
        return {
            getItemList,
        }
    })
    const uid = 1

    async function getItemList() {
        const res = await axios.get(`/getTodos?uid=${uid}`)
        setItemList(res.data)
        console.log(itemList);
    }


    return (
        <List>
            {
                itemList.map((item) => (
                    <List.Item
                        key={item.itemId}
                        prefix={
                            <p style={{ fontSize:'20px', fontWeight:'bold' }}>・</p>
                        }
                        className='itemContent'
                    >
                        { item.itemName }
                    </List.Item>
                ))
            }
        </List>
    )
});