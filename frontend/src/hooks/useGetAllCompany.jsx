import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setCompanies } from '@/redux/companySlice'


const useGetAllCompany = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                console.log('called');
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAllCompany();
    }, [])
}

export default useGetAllCompany