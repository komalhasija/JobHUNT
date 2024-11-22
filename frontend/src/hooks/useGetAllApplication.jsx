import { setAllAppliedJobs } from '@/redux/jobSlice';
import { asyncThunkCreator } from '@reduxjs/toolkit';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant';
const useGetAllApplication=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchApplication=async ()=>{
            try {
                const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchApplication();
    },[])
};
export default useGetAllApplication;