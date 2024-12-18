import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading,setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import store from '@/redux/store'

const Signup = () => {
    const [input,setInput]=useState({
        fullName:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });
    
    const {loading,user}=useSelector(store=>store.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const changeEventhandler=(e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    }
    const changeFilehandler=(e)=>{
        setInput({...input, file:e.target.files?.[0]});
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("fullName",input.fullName);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("password",input.password);
        formData.append("role",input.role);
        if(input.file){
            formData.append("file",input.file);
        }
        try{
            dispatch(setLoading(true));
            const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message);
           
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
  return (
    <div>
            <div>
            <Navbar />
            <div className='flex item-center justify-center max-w-7xl mx-auto  '>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 '>
                    <h1 className='font-bold text-xl mb-5'>Sign up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="patel"
                            value={input.fullName}
                            name="fullName"
                            onChange={changeEventhandler}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="patel@gmail.com"
                            value={input.email}
                            name="email"
                            onChange={changeEventhandler}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            placeholder="98xxxxxxxx" 
                             value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventhandler}
                            />

                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="patel" 
                             value={input.password}
                            name="password"
                            onChange={changeEventhandler}
                            />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                                <Input 
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role==='student'}
                                onChange={changeEventhandler}
                                className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <Input 
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role==='recruiter'}
                                onChange={changeEventhandler}
                                className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFilehandler}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>
                    {
                        loading?<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>
                        :<Button type='submit' className='w-full my-4 bg-[#03a1fc] hover:bg-[#3293a8]'>Signup</Button>
                    }
                  
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Signup
