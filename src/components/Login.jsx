import {auth,googleAuth} from '../config/firebase';
import {useState,useEffect} from 'react';
import{
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import '../index.css';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [user,setUser]=useState(null);
    const [isLogin,setIsLogin]=useState(true);
    const navigate=useNavigate();

    const login=async()=>{
        try{
            const result=await signInWithEmailAndPassword(auth,email,password);
            toast.success("login successfull");
            await updateProfile(result.user, {
                displayName: name,
            });
            navigate('/home');
        }
        catch(err){
            toast.error("Invalid credentials");
        }
    };
    const register=async()=>{
        try{
            const result=await createUserWithEmailAndPassword(auth,email,password);         
            toast.success("registration successfull");
            navigate('/home');  
        }
        catch(err){
            toast.error(err.message);
        }
    };
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            navigate(currentUser?'/home':'/');
        }); 
        return()=>{
            unsubscribe();
        };
    },[]);
   
    const googleLogin=async()=>
    {
        try{
            await signInWithPopup(auth,googleAuth);
            toast.success("login successfull");
            navigate('/home');
        }
        catch(err){
            toast.error(err.message);
        }
    }


    return (
        <div className='main'>
            <div className='login'>
            <h1>{isLogin?"Login":"SignUp"}</h1>
             <input type="text" placeholder='enter name ' onChange={(e)=>setName(e.target.value)} required/> <br />
            <input type="email" placeholder='enter email ' onChange={(e)=>setEmail(e.target.value)} required/> <br />
            <input type="password" placeholder='enter password' onChange={(e)=>setPassword(e.target.value)} required/> <br />
            <button onClick={isLogin?login:register}>{isLogin?"Login":"SignUp"}</button>   <br />
            <img src="https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-logo-vector-png-image_9183290.png" alt="SignIn With Google"  title="SignIn With Google" className='img' onClick={googleLogin}/> <br />
           <p onClick={()=>setIsLogin(!isLogin)} className='switch'>{isLogin?"newUser? signUp":"alreadyExsits? Login"}</p>
            </div>
        </div>
    );
}
export default Login;