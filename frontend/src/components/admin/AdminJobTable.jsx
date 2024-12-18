import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal ,Eye} from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobTable= () => {
    const { alladminJobs,searchJobByText } = useSelector(store => store.job);
    const [filterJob,setFilterJob]=useState(alladminJobs);
    const navigate=useNavigate();
    useEffect(()=>{
        const filteredJobs= alladminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())||job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase()) ;
        });
        setFilterJob(filteredJobs);
    },[alladminJobs,searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>
                    A List of your recent posted Jobs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob?.map((job) => (
                            <tr>
                                <TableCell>
                                   {job?.company?.name}
                                </TableCell>
                                <TableCell>
                                    {job?.title}
                                </TableCell>
                                <TableCell>
                                    {job?.createdAt.split("T")[0]}
                                </TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /> </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}~`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>

                                    </Popover>
                                </TableCell>
                            </tr>
                        )
                        )
                    }


                </TableBody>
            </Table>
        </div>
    )
}
export default AdminJobTable
