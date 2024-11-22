import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setAllJobs } from '@/redux/jobSlice';
import { toast } from 'sonner';


const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            }
            catch (error) {
                toast(error.response.data.message);
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [])
}

export default useGetAllJobs
