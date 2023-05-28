import React, { useEffect, useState } from 'react';
// import { saveAs } from 'file-saver';
function Suspend({ margin, verified }) {
  
//   const [info, setInfo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [certs, setCerts] = useState([])
  const [message, setMessage] = useState(false)
  const suspend = async (licenceNumber, id) => {
    await fetch("http://34.131.172.11:5000/api/credentials/suspend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        certificateNumber: licenceNumber,
        certificateId: id
      })
    }).then((res) => res.json())
      .then((data) => {
        setMessage(true)
      })
  }
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
      {message && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg">
          <p className="text-lg font-semibold mb-4">Certificate Suspended!</p>
          <button
            className="w-full py-2 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-400 mt-4"
            onClick={() => setMessage(false)}
          >
            OK
          </button>
        </div>
      </div>
    )}
      <div className={`${margin ? 'marginClosed' : 'marginOpen'} flex flex-col flex-start  px-4 pt-10 gap-20 transition-all duration-500 ease-in-out h-screen`}>
        <div className="bg-[#F1F1F1] w-11/12 rounded-lg h-screen m-5 p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center mx-5">
              <div className="title font-bold text-2xl text-center">Suspend Certificates</div>
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
                        !cert.isValid ? "" :
                      <>
                        <br />
                        <tr key={cert.id}>
                          <td>{cert.id}</td>
                          <td>{cert.doctorName}</td>
                          <td>{cert.licenseNumber}</td>
                          <td>{cert.issuer}</td>
                          <td>{cert.isValid ? "Valid" : "Suspended"}</td>
                          <td className='flex flex-row justify-center items-center p-2 gap-4 w-18 h-7 bg-red-500 cursor-pointer rounded-md text-white hover:bg-red-800 duration-300' onClick={() => { suspend(cert.licenseNumber, cert.id) }}>Suspend</td>
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

export default Suspend