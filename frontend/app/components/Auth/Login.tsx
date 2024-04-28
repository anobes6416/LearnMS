"use client";
import React, {FC, useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { 
    AiOutlineEye, 
    AiOutlineEyeInvisible, 
    AiFillGithub
    } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style"
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

type Props = {
setRoute: (route: string) => void;
setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(8),
});

const Login: FC<Props> = ({setRoute, setOpen}) => {
    const [show, setShow] = useState(false);
    const [login,{isSuccess, error}] = useLoginMutation();
    const formik = useFormik({
        initialValues: { email: "", password: ""},
        validationSchema: schema,
        onSubmit: async ({ email, password}) => {
            await login({email, password});
        }
        });
        
        useEffect(() => {
            if(isSuccess){
                toast.success("Login Successfully!");
                setOpen(false);
            }
            if(error){
                if("data" in error){
                    const errorData = error as any;
                    toast.error(errorData.data.message)
                }
            }
        }, [isSuccess, error]);

        const {errors, touched , values, handleChange, handleSubmit} = formik;


        return (
            <div className="w-full">
                <h1 className= {`${styles.title}`}>
                    Login with ELearning
                </h1>
                <form onSubmit={handleSubmit}>
                    <label 
                    className={`${styles.label}`} 
                    htmlFor="email"
                    >
                        Enter your Email
                    </label>
                    <input 
                    type="email"
                    name=""
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder="sebonaifa777@gmail.com"
                    className= {`${errors.email && touched.email && "border-red-500"} ${
                            styles.input
                        }`}
                    />
                    {errors.email && touched.email && (
                            <span className="text-red-500 pt-2 block">{errors.email}</span>
                    )}
                    <div className="w-full mt-5 relative mb-1">
                        <label className={`${styles.label}`} htmlFor="password">
                            Enter your Password
                        </label>
                        <input 
                            type={!show ? "password" : "text"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            id="password"
                            placeholder="Asdf123!@#"
                            className= {`${errors.email && touched.email && "border-red-500"} ${
                                styles.input
                            }`}
                        />
                        {!show ? (
                            <AiOutlineEyeInvisible
                            className="absolute bottom-1 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(true)}
                            />
                        ):(
                            <AiOutlineEye
                            className="absolute bottom-1 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(false)}
                            />
                        )}
                    </div>
                    <div className="w-full mt-5">
                        <input type="submit" value="Login" className= "flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold"
/>
                    </div>
                    <br/>
                    <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                        Or join with
                    </h5>
                    <div className="flex items-center justify-center my-3">
                        <FcGoogle size={30} className="cursor-pointer ml-2"
                            onClick={() => signIn("google")}/>
                        <AiFillGithub size={30} className="cursor-pointer ml-2" onClick={() => signIn("google")}/>
                    </div>
                    <h5 className="text-center pt-4 font-Poppins text-[14px]">
                        Not have an account? {" "}
                        <span className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Sign-Up")}>
                            Sign Up
                        </span>
                    </h5>
                </form>
            </div>
        )
    };

    export default Login