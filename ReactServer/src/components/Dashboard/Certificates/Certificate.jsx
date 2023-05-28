import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
function Certificate({margin}) {
  // const [verified,setVerified]=useState(false);
  const [info, setInfo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [certs, setCerts] = useState([])
  const [extra, setExtra] = useState([])
  const [modalData, setModalData] = useState({})
  const getMoreData = async (licenceNumber, id) => {
    const index = id - 1;
    setModalData(certs[index])
    setInfo(true)
    await fetch("http://34.131.172.11:5000/api/credentials/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        licenseNumber: licenceNumber
      })
    }).then((res) => res.json())
      .then((data) => {
        setExtra(data)
      })
  }
  const downloadCertificate = (lic) => {
    // API endpoint to download the certificate
    const apiEndpoint = `http://34.131.172.11:5000/api/generate-certificate?licenseNumber=${lic}`;
  
    // Make a GET request to the API
    fetch(apiEndpoint)
      .then((response) => {
        // Check if the response is successful
        if (response.ok) {
          // Extract the filename from the response headers
          const contentDisposition = response.headers.get('content-disposition');
          const filename = contentDisposition
            ? contentDisposition.split('filename=')[1]
            : 'certificate.pdf';
  
          // Initiate the download using the response blob
          response.blob().then((blob) => {
            saveAs(blob, filename);
          });
        } else {
          // Handle the error if the response is not successful
          throw new Error('Failed to download certificate');
        }
      })
      .catch((error) => {
        // Handle any errors during the API request
        console.error(error);
      });
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://34.131.172.11:5000/api/credentials/all").then((res) => res.json())
      // console.log(response.certificates)
      setCerts(response.certificates)
      setLoading(false)

    }
    fetchData()
  }, [])

  return (
    
    <>
      {info && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div Style="width:70rem" className="flex flex-col max-h-max bg-white p-8 gap-26 rounded-lg">
            <div className="flex w-full justify-end">
              <img src="../../../close.svg" onClick={() => { setInfo(false); setModalData([]); setExtra([]) }} className="cursor-pointer" width="15px" height="15px" alt="" />
            </div>
            <div className='flex flex-col justify-center items-center gap-5'>
              <p className="text-2xl font-bold mb-4">Certificate Details</p>
              <div className="dataHolder w-full flex flex-col gap-5 items-start">
                <div className="flex flex-row gap-3 w-full justify-between">
                  <div className="flex w-5/12 flex-col gap-1">
                    <label htmlFor="info_name">Certificate Holder Name</label>
                    <input id="info_name" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={modalData.doctorName} disabled />
                  </div>
                  <div className="flex w-3/12 flex-col gap-1">
                    <label htmlFor="info_type">Certificate Type</label>
                    <input id="info_type" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={modalData.credentialType} disabled />
                  </div>
                  <div className="flex w-4/12 flex-col gap-1">
                    <label htmlFor="info_deg">Degree Name</label>
                    <input id="info_deg" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={modalData.degreeName} disabled />
                  </div>
                </div>
                <div className="flex flex-row gap-3 w-full justify-between">
                  <div className="flex w-5/12 flex-col gap-1">
                    <label htmlFor="info_name">Licence Number</label>
                    <input id="info_name" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={modalData.licenseNumber} disabled />
                  </div>
                  <div className="flex w-3/12 flex-col gap-1">
                    <label htmlFor="info_type">Date of Graduation</label>
                    <input id="info_type" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={modalData.graduationDate} disabled />
                  </div>
                  <div className="flex w-4/12 flex-col gap-1">
                    <label htmlFor="info_deg">Name of the University</label>
                    <input id="info_deg" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={modalData.university} disabled />
                  </div>
                </div>
                <div className="flex flex-row gap-3 w-full justify-between">
                  <div className="flex w-5/12 flex-col gap-1">
                    <label htmlFor="info_trans">TransanctionId</label>
                    <input id="info_trans" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={extra.transactionHash} disabled />
                  </div>
                  <div className="flex w-3/12 flex-col gap-1">
                    <label htmlFor="info_lic">Licence Status</label>
                    <input id="info_lic" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={modalData.isValid ? "Verified" : "Suspended"} disabled />
                  </div>
                  <div className="flex w-4/12 flex-col gap-1">
                    <label htmlFor="info_block">Block Number</label>
                    <input id="info_block" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={extra.blockNumber} disabled />
                  </div>
                </div>
                <div className="flex flex-row gap-3 w-full justify-between">
                  <div className="flex w-5/12 flex-col gap-1">
                    <label htmlFor="info_addr">Permanent Address</label>
                    <input id="info_addr" className="w-full p-2 h-28 text-start  border bg-gray-200 rounded-md" type="text" value={modalData.permanentAddress} disabled />
                  </div>
                </div>
                <div className="flex flex-row gap-3 w-full px-8 justify-center">
                  <button
                    className="max-w-max py-2 px-4 rounded-lg bg-green-600 transition-all duration-500 ease-in-out text-white font-semibold hover:bg-green-400 mt-4"
                    onClick={() => { downloadCertificate(modalData.licenseNumber); setInfo(false); setModalData([]); setExtra([]) }}
                  >
                    Download Certificate  
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`${margin ? 'marginClosed' : 'marginOpen'} flex flex-col flex-start  px-4 pt-10 gap-20 transition-all duration-500 ease-in-out h-screen`}>
        <div className="bg-[#F1F1F1] w-11/12 rounded-lg h-screen m-5 p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center mx-5">
              <div className="title font-bold text-2xl text-center">All Certificates</div>
              <input className="flex items-start p-2 gap-4 width-335 bg-white border border-gray-300 rounded-md" placeholder='Search for a record'></input>
            </div>
            <div Style="max-height:34rem" className="flex flex-col gap-1 overflow-scroll">
              <table>
                <colgroup>
                  <col Style="max-width:10%"></col>
                  <col Style="max-width:30%"></col>
                  <col Style="max-width:20%"></col>
                  <col Style="max-width:20%"></col>
                  <col Style="max-width:10%"></col>
                  <col Style="max-width:10%"></col>
                </colgroup>
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Name</th>
                    <th>Licence</th>
                    <th>Issued By</th>
                    <th>Status</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody className='text-center '>
                  {loading ? (<tr><td colSpan={6}>
                    <div className=" flex items-center items-center justify-center">
                      <div className="loader"></div>
                    </div>

                  </td></tr>)
                    :
                    certs.map((cert) => (
                      <>
                        <br />
                        <tr key={cert.id}>
                          <td>{cert.id}</td>
                          <td>{cert.doctorName}</td>
                          <td>{cert.licenseNumber}</td>
                          <td>{cert.issuer}</td>
                          <td>{cert.isValid ? "Valid" : "Suspended"}</td>
                          <td className='flex flex-row justify-center items-center p-2 gap-4 w-18 h-7 bg-green-500 cursor-pointer rounded-md text-white hover:bg-green-800 duration-300' onClick={() => { getMoreData(cert.licenseNumber, cert.id) }}>View</td>
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
    </>
  )
}

export default Certificate