// import React from 'react'
import { Icon } from '@iconify/react';
import { Link ,Outlet} from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import checkAuth from '../Auth/TokenRefresh';
function DashNav({setMargin}) {
    useEffect(() => {
        checkAuth()
    })
    const [collapsed, setCollapsed] = useState(false);
    const handleLogout = () => {
        // Clear access token from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('verified');
        // Redirect to login page
        window.location.href = '/login';
        // history.push('/login');
    };
    return (
        <>
        <div className="">
            <div Style="position: absolute; left: 0; top: 0; background: linear-gradient(180deg, #52AF7B 0%, rgba(4, 127, 112, 0.7) 100%);" className={`${collapsed ? `w-20 ` : `px-3 w-1/5`} transition-all duration-500 ease-in-out hidden md:flex flex-row flex-start py-1 min-h-full h-auto gap-0.62`}>
                <div className="flex flex-col items-center pt-5 pl-4 flex-wrap gap-6 ">
                    <div className="flex flex-col flex-start gap-5">
                        <div className="flex flex-row justify-between w-full items-center ">
                            <Link to="/" className="brandName text-2xl font-bold text-white cursor-pointer ">वै{collapsed ? '' : 'द्य-Chain'}</Link>
                            <Icon icon={`ep:arrow-${collapsed ? 'right' : 'left'}-bold`} color="white" onClick={() =>{ setCollapsed(!collapsed);setMargin(!collapsed)}} width={collapsed ? "20" : "26"} height={collapsed ? "20" : "26"} />
                        </div>
                        <div className={`flex flex-col flex-start ${collapsed?'items-center':''} gap-5`}>
                            <Link to="/dashboard" className="flex flex-col flex-start gap-2">
                                <div className="font-s text-white cursor-pointer font-bold">{collapsed ? '' : 'Dashboard'}</div>
                                <div className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="ic:outline-dashboard" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'Dashboard'}</div>
                            </Link>
                            <div className="flex flex-col flex-start gap-2">
                                <div className="font-s text-white cursor-pointer  font-bold">{collapsed ? '' : 'Certification'}</div>
                                <Link to="certificates/all" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="la:certificate" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'All Certificates'}</Link>
                                <Link to="certificates/issue" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="ph:certificate" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'Issue a Certificate'}</Link>
                                <Link to="certificates/approve" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="mdi:approve" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'Certificate Approval'}</Link>
                                <Link to="certificates/suspend" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="fluent:document-dismiss-24-regular" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'Certificate Suspension'}</Link>
                            </div>
                            <div className="flex flex-col flex-start gap-2">
                                <div className="font-s text-white cursor-pointer  font-bold">{collapsed ? '' : 'Organization'}</div>
                                <Link to="/dashboard/org/verify" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="fluent:document-ribbon-16-regular" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'Organization Verification'}</Link>
                                <Link to="/dashboard/org/info" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="clarity:organization-line" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'Organization Information'}</Link>
                                <Link to="/dashboard/org/billing" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="medical-icon:i-billing" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'Billing'}</Link>
                            </div>
                            <div className="flex flex-col flex-start gap-2">
                                <div className="font-s text-white cursor-pointer  font-bold">{collapsed ? '' : 'About'}</div>
                                <Link to="/about" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="mdi:about" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'About वैद्य-Chain'}</Link>
                                <Link to="/proc" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="uil:file-question" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'Where is my data'}</Link>
                                <Link to="/faqs" className="flex flex-row gap-2 font-m text-white cursor-pointer items-center text-lg"><Icon icon="ph:question" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"} />{collapsed ? '' : 'FAQs'}</Link>
                            </div>
                        </div>
                    </div>
                    <div className={`logout flex flex-row flex-start font-m text-white cursor-pointer items-center text-lg`} onClick={handleLogout}><Icon icon="ant-design:logout-outlined" width={collapsed ? "34" : "26"} height={collapsed ? "34" : "26"}  />{collapsed ? '' : 'Logout'}</div>
                </div>
                {/* <h1>Welcome to the Dashboard!</h1>
{loggedIn && (
<button onClick={handleLogout}>Logout</button>
)} */}
            </div>
        </div>
        <Outlet />
        </>
    )
}

export default DashNav