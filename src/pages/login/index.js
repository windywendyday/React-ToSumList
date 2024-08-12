import React, { useState, useEffect } from "react";
import {Button, Form, Input} from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons"
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const [form] = Form.useForm()

    function goToRegister() {
        navigate('/register');
    }
    async function onFinish() {
        const { email, password } = form.getFieldsValue()
        let { data } = await axios.post('/loginUser', {
            email: email,
            password: password,
        });
        if(data.code === 'SUCCESS'){
            navigate('/home/listview')
        }
    }

    return (
        <div>
            <Form
                form={form}
                header={'登录'}
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
            <div className="tips" onClick={goToRegister}>没有账号？去注册</div>
        </div>
    )
}