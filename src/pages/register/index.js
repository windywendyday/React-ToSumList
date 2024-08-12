import React, { useState, useEffect } from "react";
import {Button, Form, Input} from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons"
import './index.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    async function register(email, password) {
        console.log('email', email, 'password', password);
        const registerRes = await axios.post('/registerUser', {
            email: email,
            password: password,
        });
        return registerRes;
    }

    const [form] = Form.useForm()
    const navigate = useNavigate();
    const onFinish = async () => {
        const { email, password } = form.getFieldsValue()
        setEmail(email)
        setPassword(password)
        let { data } = await register(email, password)
        if(data.code === 'SUCCESS'){
            navigate('/home/listview')
        }
    }

    function goToLogin(){
        navigate('/login')
    }

    return (
        <div>
            <Form
                form={form}
                layout='horizontal'
                onFinish={onFinish}
                footer={
                    <Button
                        color='primary'
                        type='submit'
                        size='large'
                    >
                        提交
                    </Button>
                }
            >
                <Form.Header> Record Your Life 注册</Form.Header>
                <Form.Item label='邮箱' name='email'>
                    <Input placeholder='请输入邮箱'></Input>
                </Form.Item>
                <Form.Item label='密码' name='password'>
                    <div className='password'>
                        <Input placeholder='请输入密码' type={visible ? 'text' : 'password'}/>
                        <div className='eyeIcon'>
                            {!visible ? (
                                <EyeInvisibleOutline onClick={() => setVisible(true)}/>
                            ) : (
                                <EyeOutline onClick={() => setVisible(false)}/>
                            )}
                        </div>
                    </div>
                </Form.Item>
            </Form>
            <div onClick={goToLogin}>已有账号，去登录</div>
        </div>
    )
}