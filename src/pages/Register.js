import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Register.module.scss';
import Input from '../components/Form/Input';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [registerInfor, setRegisterInfor] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
    });
    const [errorMessages, setErrorMessages] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const hanldeOnFormChange = (data) => {
        setRegisterInfor({ ...registerInfor, ...data });
    };

    const handleValidation = () => {
        let valid = true;
        const errors = {
            username: '',
            email: '',
            phoneNumber: '',
            password: '',
        };

        if (!registerInfor.username) {
            errors.username = 'Vui lòng nhập họ và tên';
            valid = false;
        }

        if (!registerInfor.email) {
            errors.email = 'Vui lòng nhập email';
            valid = false;
        }

        if (!registerInfor.phoneNumber) {
            errors.phoneNumber = 'Vui lòng nhập số điện thoại';
            valid = false;
        }

        if (!registerInfor.password) {
            errors.password = 'Vui lòng nhập mật khẩu';
            valid = false;
        }

        setErrorMessages(errors);
        return valid;
    };

    const handleOnSubmit = () => {
        if (handleValidation()) {
            const postRegister = async () => {
                const options = [
                    {
                        url: 'http://localhost:1337/api/auth/local/register',
                        method: 'POST',
                        data: registerInfor,
                    },
                    {
                        url: 'http://localhost:1337/api/customers',
                        method: 'POST',
                        data: {
                            data: { ...registerInfor },
                        },
                    },
                ];
                const requests = options.map((option) => axios.request(option));
                try {
                    const responses = await axios.all(requests);
                    const results = [...responses.map((response) => response.data)];
                    navigate('/login');
                    console.log(results);
                } catch (error) {
                    console.log(error);
                }
            };
            postRegister();
        }
    };

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate('/');
        }
    }, []);

    return (
        <div className={clsx(styles.container)}>
            <h1 className={clsx(styles.header)}>Đăng ký</h1>
            <div className={clsx(styles.form)}>
                <Input
                    type={'text'}
                    id={'username'}
                    value={registerInfor.username}
                    label={'Họ và Tên'}
                    placeHolder={'Nhập họ và tên'}
                    onChange={hanldeOnFormChange}
                />
                {errorMessages.username && <p className={styles.error}>{errorMessages.username}</p>}
                <Input
                    type={'text'}
                    id={'email'}
                    value={registerInfor.email}
                    label={'Email'}
                    placeHolder={'Nhập email'}
                    onChange={hanldeOnFormChange}
                />
                {errorMessages.email && <p className={styles.error}>{errorMessages.email}</p>}
                <Input
                    type={'text'}
                    id={'phoneNumber'}
                    value={registerInfor.phoneNumber}
                    label={'Số điện thoại'}
                    placeHolder={'Nhập số điện thoại'}
                    onChange={hanldeOnFormChange}
                />
                {errorMessages.phoneNumber && <p className={styles.error}>{errorMessages.phoneNumber}</p>}
                <Input
                    type={'password'}
                    id={'password'}
                    value={registerInfor.password}
                    label={'Mật khẩu'}
                    placeHolder={'Nhập mật khẩu'}
                    onChange={hanldeOnFormChange}
                />
                {errorMessages.password && <p className={styles.error}>{errorMessages.password}</p>}
                <div className={clsx(styles.button)} onClick={handleOnSubmit}>
                    Đăng ký
                </div>
            </div>
            <div className={clsx(styles.login)}>
                Bạn đã có tài khoản?{' '}
                <span>
                    <Link to={'/login'} className={clsx(styles.link)}>
                        Đăng nhập ngay
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default Register;
