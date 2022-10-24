import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface props {
    checkAuth: () => void;
}
const Login = ({ checkAuth }: props) => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [notf, setNotf] = useState(false);
    const check = () => {
        if (email === 'admin' && pw === 'admin') checkAuth();
        else setNotf(true);
    };
    return (
        <div className=" bg-gray-100 flex justify-center items-center h-screen">
            <div className="hidden md:block bg-blue-700 w-3/12 h-4/5 rounded-tl-3xl rounded-bl-3xl shadow-md"></div>
            <div className="w-3/12 h-4/5 bg-white rounded-tr-3xl rounded-br-3xl">
                <div className="text-center py-4 mt-6">Logo</div>
                <div className="text-center py-4 text-3xl font-semibold">Welcome</div>
                <p className="text-center text-gray-500 px-12 text-sm">
                    Aliquam consectetur et tincidunt praesent enim massa pellentesque velit odio neque
                </p>
                {notf && <p className=" mt-8 text-center font-bold text-sm text-red-500">Wrong Credentials!</p>}
                <form className="px-16 mt-8">
                    <div className="relative ">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className=" w-full h-10 pl-2 border rounded-lg outline-blue-700"
                            placeholder="Email"
                        />
                        <AtSymbolIcon className=" absolute top-1/2 -translate-y-1/2 right-2 w-4 text-gray-500" />
                    </div>

                    <div className="relative">
                        <input
                            onChange={(e) => setPw(e.target.value)}
                            className="w-full h-10 mt-4 pl-2 border rounded-lg outline-blue-700"
                            placeholder="Password"
                        />
                        <LockClosedIcon className=" absolute top-1/2 right-2 w-4 text-gray-500" />
                    </div>
                </form>
                <p className="text-right pr-16 underline text-xs cursor-pointer">Forgot password?</p>
                <div className="flex justify-center">
                    <button
                        onClick={check}
                        className="w-2/3 text-white px-16 py-3 font-semibold bg-blue-700 mt-8 rounded-lg hover:bg-opacity-90"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Login;
