import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';

const DashboardHome = ({ margin, verified }) => {
    const [loading, setLoading] = useState(true)
    const [certs, setCerts] = useState([])
    const [approved, setApproved] = useState(null)
    const [suspended, setSuspended] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);
    // const [verified, setVerified] = useState(false);
    console.log(loggedIn)

    //   const history = useHistory();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://34.131.172.11:5000/api/credentials/all").then((res) => res.json())
            // console.log(response.certificates)
            setCerts(response.certificates)
            const certifcates=response.certificates;
            const app = certifcates.filter((cert) => cert.isValid === true);
            setApproved(app.length)
            const sus = certifcates.filter((cert) => cert.isValid === false);
            setSuspended(sus.length)
            setLoading(false)

        }
        fetchData()
        const token = localStorage.getItem('accessToken');
        if (token) {
            // User is logged in
            setLoggedIn(true);
        } else {
            // User is not logged in, redirect to login page
            window.location.href = '/login';
            // console.log(token) 
        }
    }, []);

    // Handle logout


    return (<>
        {verified &&
            (
                <div className={`${margin ? 'marginClosed' : 'marginOpen'} flex flex-col flex-start  px-4 pt-10 gap-20 transition-all duration-500 ease-in-out h-screen`}>
                    <div className="flex flex-row gap-5 h-max">
                        <div className="grad flex flex-col flex-wrap gap-2 p-10 h-50 content-center justifiy-content rounded-lg text-white font-semibold shadow-md hover:shadow-lg">
                            <div className="font-bold text-3xl">{approved}</div>
                            <div className="text-2xl">Certificates Registered</div>
                        </div>
                        <div className="grad flex flex-col flex-wrap gap-2 p-10 h-50 content-center justifiy-content rounded-lg text-white font-semibold shadow-md hover:shadow-lg">
                            <div className="font-bold text-3xl">{suspended}</div>
                            <div className="text-2xl">Certificates Suspended</div>
                        </div>
                    </div>
                    <div Style='width:60rem' className={`bg-[#F1F1F1] rounded-lg h-96 px-5 py-5`}>
                        <div className={` flex flex-col flex-start px-4 gap-20 transition-all duration-500 ease-in-out h-full`}>
                            <div className="bg-[#F1F1F1] w-full rounded-lg h-full m-5 p-5">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="title font-bold text-2xl text-center">Recently Registered</div>
                                    </div>
                                    <div Style="max-height:34rem" className="flex flex-col gap-1 overflow-scroll">
                                        <table>
                                            <colgroup>
                                                <col Style="max-width:10%"></col>
                                                <col Style="max-width:30%"></col>
                                                <col Style="max-width:20%"></col>
                                                <col Style="max-width:20%"></col>
                                                <col Style="max-width:20%"></col>
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>Sr</th>
                                                    <th>Name</th>
                                                    <th>Licence</th>
                                                    <th>Issued By</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center '>
                                                {loading ? (<tr><td colSpan={6}>
                                                    <div className=" flex items-center items-center justify-center">
                                                        <div className="loader"></div>
                                                    </div>

                                                </td></tr>)
                                                    :
                                                    certs.slice(certs.length-4, certs.length).reverse().map((cert) => (
                                                        <>
                                                          <br />
                                                          <tr key={cert.id}>
                                                            <td>{cert.id}</td>
                                                            <td>{cert.doctorName}</td>
                                                            <td>{cert.licenseNumber}</td>
                                                            <td>{cert.issuer}</td>
                                                            <td>{cert.isValid ? "Valid" : "Suspended"}</td>
                                                            {/* <td className='flex flex-row justify-center items-center p-2 gap-4 w-18 h-7 bg-green-500 cursor-pointer rounded-md text-white hover:bg-green-800 duration-300' onClick={() => { getMoreData(cert.licenseNumber, cert.id) }}>View</td> */}
                                                          </tr>
                                                        </>
                                                      ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    </>

    );
};

export default DashboardHome;
