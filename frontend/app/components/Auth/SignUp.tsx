"use client";
import React, {FC, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style"
type Props = {
setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(8),
});


const SignUp: FC<Props> = ({setRoute}) => {
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: { name:"", email: "", password: ""},
        validationSchema: schema,
        onSubmit: async ({ email, password}) => {
            setRoute("Verification");
        }
        });
        
        const {errors, touched , values, handleChange, handleSubmit} = formik;


        return (
            <div className="w-full">
                <h1 className= {`${styles.title}`}>
                    Join with ELearning
                </h1>
                <form onSubmit={handleSubmit}>
                   <div className="mb-3">
                   <label 
                    className={`${styles.label}`} 
                    htmlFor="email"
                    >
                        Enter your Name
                    </label>
                    <input 
                    type="text"
                    name=""
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    placeholder="Ex: Sebona Ifa"
                    className= {`${errors.name && touched.name && "border-red-500"} ${
                            styles.input
                        }`}
                    />
                    {errors.name && touched.name && (
                            <span className="text-red-500 pt-2 block">{errors.name}</span>
                    )}
                   </div>
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
                            className= {`${errors.password && touched.password && "border-red-500"} ${
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
                    {errors.password && touched.email && (
                            <span className="text-red-500 pt-2 block">{errors.email}</span>
                    )}
                    <div className="w-full mt-5">
                        < input type="submit" value="Sign Up" className= "flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold"/>
                    </div>
                    <br/>
                    <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                        Or join with
                    </h5>
                    <div className="flex items-center justify-center my-3">
                        <FcGoogle size={30} className="cursor-pointer ml-2"/>
                        <AiFillGithub size={30} className="cursor-pointer ml-2"/>
                    </div>
                    <h5 className="text-center pt-4 font-Poppins text-[14px]">
                        Already have an account? {" "}
                        <span className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Login")}>
                            Sign in
                        </span>
                    </h5>
                </form>
            </div>
        )
    };

    export default SignUp