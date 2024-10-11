import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../store/themeConfigSlice';
import Dropdown from '../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../components/Icon/IconCaretDown';
import IconMail from '../components/Icon/IconMail';
import IconLockDots from '../components/Icon/IconLockDots';
import IconInstagram from '../components/Icon/IconInstagram';
import IconFacebookCircle from '../components/Icon/IconFacebookCircle';
import IconTwitter from '../components/Icon/IconTwitter';
import IconGoogle from '../components/Icon/IconGoogle';
import { loginUser } from '../service/UserService'; // Sử dụng hook quản lý hospital
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const LoginBoxed = () => {
    const MySwal = withReactContent(Swal);

    const [datauser,setdatauser] = useState({
        username:'',
        password:''
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);
    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload
        const responsive:any = await loginUser(datauser);
        if(responsive.success==true){
            console.log('login thành công');
            console.log(responsive.message.token)
            localStorage.setItem('usertoken', responsive.message.toke); // Lưu token vào localStorage

            MySwal.fire({
                title: 'login success',
                text: 'Login Success',
                icon: 'success',
              });
              navigate('/');
        }else{
            console.log('login thất bại')
            MySwal.fire({
                title: 'login error',
                text: 'login error',
                icon: 'error',
              });
        }
            
        

    };
    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/26800.jpg" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center  bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">

                <div className="relative w-full max-w-[870px] rounded-md ">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="absolute top-6 end-6">
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            // setFlag(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input id="username" type="text" placeholder="Enter Username" 
                                        onChange={(e) => setdatauser({ ...datauser, username: e.target.value })}

                                        className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input id="Password" type="password" placeholder="Enter Password" 
                                        onChange={(e) => setdatauser({ ...datauser, password: e.target.value })}

                                        className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="btn w-full !mt-6 border-0 uppercase bg-[#2196F3] text-white shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] hover:bg-[#1976D2]"
                                >
                                    Sign in
                                </button>

                            </form>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
