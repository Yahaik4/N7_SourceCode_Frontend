import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';

import styles from './Register.module.scss';
import Input from '../components/Form/Input';

function Login() {
    const navigate = useNavigate();
    const [loginInfor, setLoginInfor] = useState({
        identifier: '',
        password: '',
    });

    // const [alertMsg, setAlertMsg] = useState('');

    const hanldeOnFormChange = (data) => {
        setLoginInfor({ ...loginInfor, ...data });
    };
    const handleOnSubmit = () => {
        const getCustomerId = async () => {
            const options = {
                url: `http://localhost:1337/api/customers?filters[email][$eq]=${localStorage.getItem('useremail')}`,
                method: 'GET',
            };
            await axios
                .request(options)
                .then((response) => response.data)
                .then((result) => {
                    localStorage.setItem('customerId', result.data[0].id);
                    navigate('/');
                })
                .catch((err) => console.log(err));
        };
        const postLogin = async () => {
            const options = {
                url: 'http://localhost:1337/api/auth/local',
                method: 'POST',
                data: loginInfor,
            };
            await axios
                .request(options)
                .then((response) => response.data)
                .then((result) => {
                    const jwt = result.jwt;
                    const auth = localStorage.getItem('auth');
                    if (!auth) {
                        localStorage.setItem('auth', jwt);
                        localStorage.setItem('username', result.user.username);
                        localStorage.setItem('userphone', result.user.phoneNumber);
                        localStorage.setItem('userid', result.user.id);
                        localStorage.setItem('useremail', result.user.email);
                    }
                })
                .then(() => getCustomerId())
                .catch((err) => console.log(err));
        };
        postLogin();
    };

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate('/');
        }
    }, []);
    return (
        <div className={clsx(styles.container)}>
            <h1 className={clsx(styles.header)}>Đăng Nhập</h1>
            <div className={clsx(styles.form)}>
                <Input
                    type={'email'}
                    id={'identifier'}
                    value={loginInfor.identifier}
                    label={'email'}
                    placeHolder={'Nhập email'}
                    onChange={hanldeOnFormChange}
                    // alertMsg={'Vui lòng nhập email'}
                />
                <Input
                    type={'password'}
                    id={'password'}
                    value={loginInfor.password}
                    label={'Mật Khẩu'}
                    placeHolder={'Nhập Mật khẩu'}
                    onChange={hanldeOnFormChange}
                    // alertMsg={alertMsg || ''}
                />
                <div className={clsx(styles.button)} onClick={handleOnSubmit}>
                    Đăng Nhập
                </div>
            </div>
            <div className={clsx(styles.login)}>
                Bạn chưa có tài khoản?{' '}
                <span>
                    <Link to={'/register'} className={clsx(styles.link)}>
                        Đăng ký ngay
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default Login;
