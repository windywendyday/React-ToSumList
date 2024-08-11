import React, { useState, useEffect } from "react";
import {Form, Input} from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Form header={'登录'}>
                <Form.Item label='邮箱' name='email'>
                    <Input placeholder='请输入邮箱'></Input>
                </Form.Item>
                <Form.Item label='密码' name='password'>
                    <Input placeholder='请输入密码' type={visible ? 'text' : 'password'}>
                        <div className='eyeIcon'>
                            {!visible ? (
                                <EyeInvisibleOutline onClick={() => setVisible(true)}/>
                            ) : (
                                <EyeOutline onClick={() => setVisible(false)}/>
                            )}
                        </div>
                    </Input>
                </Form.Item>
            </Form>
        </div>
    )
}