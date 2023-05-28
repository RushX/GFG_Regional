import React, {  useState } from 'react'
import { getAuth } from 'firebase/auth';


function Issue({ margin, verified }) {
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [statusModal, setStatusModal] = useState([])
    const [tempType, setTempType] = useState('')
    const [type, setType] = useState('')
    const [uid, setUid] = useState('')
    const [degName, setDegName] = useState('')
    const [issuer, setIssuer] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [btnContent, SetBtnContent] = useState('Confirm Registration')
    const [lic, setLic] = useState('')
    const auth = getAuth();
    const [dog, setDog] = useState('')
    const [confirm, setConfirm] = useState(false);
    const degreeOptions = {
        MedicalDegreeCertificate: [
            "Doctor of Medicine(M.D.)",
            "Bachelor of Medicine, Bachelor of Surgery(MBBS)",
            "Doctor of Osteopathic Medicine(D.O.)",
            "Doctor of Dental Surgery(DDS)",
            "Doctor of Veterinary Medicine(DVM)",
            "Doctor of Pharmacy(Pharm.D)",
            "Doctor of Optometry(O.D.)",
            "Doctor of Podiatric Medicine(DPM)",
            "Doctor of Chiropractic(D.C.)",
            "Doctor of Naturopathic Medicine(N.D.)"
            // Add more medical degrees here
        ],
        SpecialtyCertificate: [
            "Cardiology",
            "Dermatology",
            "Gastroenterology",
            "Neurology",
            "Pediatrics",
            "Psychiatry",
            "Radiology",
            "Obstetrics and Gynecology",
            "Orthopedic Surgery",
            "Urology"
            // Add more specialty certificate options here
        ],
        BoardCertification: [
            "Indian Board of Medicine",
            "Indian Board of Surgery",
            "Indian Board of Pediatrics",
            "Indian Board of Cardiology",
            "Indian Board of Dermatology",
            "Indian Board of Radiology",
            "Indian Board of Neurology",
            "Indian Board of Gastroenterology",
            "Indian Board of Nephrology",
            "Indian Board of Endocrinology",
            "Indian Board of Pulmonary Medicine",
            "Indian Board of Hematology",
            "Indian Board of Oncology"
            // Add more Indian board certifications here
        ],
        FellowshipCertificate: [
            "Fellowship of the National Board(FNB)",
            "Fellowship of the College of Physicians and Surgeons(FCPS)",
            "Fellowship of the Indian Association of Gastrointestinal Endo Surgeons(FIAGES)",
            "Fellowship of the Indian Academy of Pediatrics(FIAP)",
            "Fellowship of the Indian Association of Cardiovascular and Thoracic Surgeons(FIACTS)",
            "Fellowship of the Indian College of Obstetricians and Gynaecologists(FICOG)",
            "Fellowship of the National Academy of Medical Sciences(FAMS)",
            "Fellowship of the Indian College of Radiology and Imaging(FICRI)",
            "Fellowship of the Indian College of Critical Care Medicine(FICCM)",
            "Fellowship of the Indian College of Cardiology(FICC)"
            // Add more fellowship certificate options here
        ],
        ContinuingMedicalEducationCertificate: [
            "CME in Infectious Diseases",
            "CME in Radiology",
            "CME in Diabetes Management",
            "CME Certificate in General Medicine",
            "CME Certificate in Pediatrics",
            "CME Certificate in Obstetrics and Gynecology",
            "CME Certificate in Cardiology",
            "CME Certificate in Dermatology",
            "CME Certificate in Orthopedics",
            "CME Certificate in Psychiatry",
            "CME Certificate in Radiology",
            "CME Certificate in Oncology",
            "CME Certificate in Anesthesiology"
            // Add more CME certificate options here
        ],
        ResearchPublicationCertificate: [
            "Research Certificate in Medical Sciences",
            "Publication Certificate in Biotechnology",
            "Research Excellence Certificate in Pharmacy",
            "Publication Achievement Certificate in Health Sciences",
            "Research Recognition Certificate in Clinical Research",
            "Publication Excellence Certificate in Ayurveda",
            "Research Achievement Certificate in Nursing",
            "Publication Recognition Certificate in Dentistry",
            "Research Contribution Certificate in Homeopathy",
            "Publication Appreciation Certificate in Physiotherapy"
            // Add more research/publication certificate options here
        ],
    };
    const handleCertificateTypeChange = (e) => {
        const selectedCertificateType = e.target.value;
        setType(selectedCertificateType);
        setTempType(selectedCertificateType.replace(/\s/g, ""));
        console.log(type);
        setDegName(""); // Reset the degree name when the certificate type changes
    };

    const CreateToken = async () => {
        SetBtnContent('Preparing Data')
        setTimeout(() => {
            SetBtnContent('Waiting for Response')
        }, 5000)
        const final = title + '.' + name
        const auth = localStorage.getItem("accessToken");
        await fetch("http://34.131.172.11:5000/api/credentials/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: uid,
                authToken: auth,
                credentialType: type,
                degreeName: degName,
                university: issuer,
                graduationDate: dog,
                certificateNumber: lic,
                permanentAddress: address,
                doctorName: final
            })
        }).then((res) => res.json())
            .then((data) => {
                SetBtnContent('Sucess')
                setLoading(false)
                setConfirm(false)
                setStatusModal(data)
                setShowStatusModal(true)
            })
    }
 
    return (

        <>
        {confirm &&
            <div className={`fixed inset-0 flex items-center ${confirm ? 'modal open' : 'modal none'} justify-center bg-gray-500 bg-opacity-75`}>
                <div className={`flex flex-col w-1/2 max-h-max bg-white p-8 gap-26 rounded-lg`}>
                    <div className="flex w-full justify-end">
                        <img src="../../../close.svg" onClick={() => setConfirm(false)} className="cursor-pointer" width="15px" height="15px" alt="" />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <p className="text-2xl font-bold mb-4">Confirm Registration</p>
                        <div className="dataHolder w-full flex flex-col gap-5 items-start">
                            <div className="flex flex-row gap-3 w-full justify-between">
                                <div className="flex w-5/12 flex-col gap-1">
                                    <label htmlFor="info_name">Certificate Holder Name</label>
                                    <input id="info_name" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={name} disabled />
                                </div>
                                <div className="flex w-3/12 flex-col gap-1">
                                    <label htmlFor="info_type">Certificate Type</label>
                                    <input id="info_type" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={type} disabled />
                                </div>
                                <div className="flex w-4/12 flex-col gap-1">
                                    <label htmlFor="info_deg">Degree Name</label>
                                    <input id="info_deg" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={degName} disabled />
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 w-full justify-between">
                                <div className="flex w-5/12 flex-col gap-1">
                                    <label htmlFor="info_name">Licence Number</label>
                                    <input id="info_name" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={lic} disabled />
                                </div>
                                <div className="flex w-3/12 flex-col gap-1">
                                    <label htmlFor="info_type">Date of Graduation</label>
                                    <input id="info_type" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={dog} disabled />
                                </div>
                                <div className="flex w-4/12 flex-col gap-1">
                                    <label htmlFor="info_deg">Name of the Issuer / University</label>
                                    <input id="info_deg" className="w-full p-2  border bg-gray-200 rounded-md" type="text" value={issuer} disabled />
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 w-full justify-between">
                                <div className="flex w-5/12 flex-col gap-1">
                                    <label htmlFor="info_addr">Permanent Address</label>
                                    <input id="info_addr" className="w-full p-2 h-28 text-start  border bg-gray-200 rounded-md" type="text" value={address} disabled />
                                </div>
                            </div>
                            <div className="italic text-gray-500">By clicking confirm you agree that you have provided the correct details</div>
                            <div className="flex flex-row gap-3 w-full px-8 justify-center">
                                <button className={`max-w-max py-2 px-4 flex flex-row items-center rounded-lg bg-green-500 transition-all duration-300 ease-in-out text-white ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} font-semibold hover:bg-green-400 mt-4`} onClick={() => { setLoading(true); CreateToken() }}>
                                    {loading ? <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> : ""}{btnContent}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        {showStatusModal &&
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                  <div className="bg-white p-8 rounded-lg">
                    <p className="text-lg font-semibold mb-4">
                        {statusModal.success?<>Registered Succesfully</>:<>Registration Failed</>}
                    </p>
                    <p>{statusModal.message?statusModal.message:( statusModal.status?<>The Transaction was completed successfully</>:<>The Transaction was Failed Due to Unknown reason</>)}</p>
                    <p>{statusModal.transanctionDetails?<><span className="hash">Transanction Hash:</span><a href={`https://https://sepolia.etherscan.io/tx/${statusModal.transanctionDetails.transanctionHash}`} className="href">Verify Transanction</a></>:""}</p>
                    <button
                      className="w-full py-2 px-4 rounded-lg bg-green-200 text-white font-semibold hover:bg-green-400 mt-4"
                        onClick={setShowStatusModal(false)}
                    >
                      OK
                    </button>
                  </div>
                </div>
        }
            <div className={`${margin ? 'marginClosed' : 'marginOpen'} flex flex-col justify-center align-center flex-start px-4 pt-10 gap-20 transition-all duration-500 ease-in-out h-screen`}>
                <div Style={`width:${margin ? '89rem' : '74rem'}`} className={`flex flex-col grad ${margin ? 'h-5/6 gap-10' : 'h-max gap-4'} transition-all duration-300 rounded-lg px-10 py-10`}>
                    {/* <div className="">HELLo</div> */}
                    {/* <div className="flex flex-col items-center gap-36"> */}
                    <div className='flex flex-col justify-center items-start gap-5'>
                        <p className="font-bold text-3xl text-white mb-4">Certificate Details</p>
                        <div className="dataHolder w-full flex flex-col gap-5 items-start">
                            <div className="flex flex-row gap-3 w-full justify-between">
                                <div className="flex w-20 flex-col gap-1">
                                    <label htmlFor="info_name" className='text-white'>Title</label>
                                    <input id="info_name" className="w-full p-2 border bg- white-200 rounded-md" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="flex w-4/12 flex-col gap-1">
                                    <label htmlFor="info_name" className='text-white'>Certificate Holder Name</label>
                                    <input id="info_name" className="w-full p-2 border bg- white-200 rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="flex w-3/12 flex-col gap-1">
                                    <label htmlFor="info_type" className='text-white'>Certificate Type</label>
                                    <select
                                        id="info_type"
                                        className="w-full p-2 border bg-white-200 rounded-md"
                                        value={type}
                                        onChange={handleCertificateTypeChange}
                                    >
                                        <option value="">Select a type</option>
                                        <option value="Medical Degree Certificate">Medical Degree Certificate</option>
                                        <option value="Specialty Certificate">Specialty Certificate</option>
                                        <option value="Board Certification">Board Certification</option>
                                        <option value="Fellowship Certificate">Fellowship Certificate</option>
                                        <option value="Continuing Medical Education Certificate">
                                            Continuing Medical Education (CME) Certificate
                                        </option>
                                        <option value="Research or Publication Certificate">
                                            Research or Publication Certificate
                                        </option>
                                    </select>
                                </div>

                                <div className="flex w-4/12 flex-col gap-1">
                                    <label htmlFor="info_deg" className='text-white'>Degree Name</label>
                                    <select id="info_deg" className="w-full p-2  border bg- white-200 rounded-md" type="text" value={degName} onChange={(e) => setDegName(e.target.value)} >
                                        {tempType && degreeOptions[tempType].map((degree) => (
                                            <option key={degree} value={degree}>{degree}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 w-full justify-between">
                                <div className="flex w-5/12 flex-col gap-1">
                                    <label htmlFor="info_name" className='text-white'>Name of Issuer</label>
                                    <input id="info_name" className="w-full p-2  border bg- white-200 rounded-md" type="text" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
                                </div>
                                <div className="flex w-3/12 flex-col gap-1">
                                    <label htmlFor="info_type" className='text-white'>Date of Graduation</label>
                                    <input id="info_type" className="w-full p-2  border bg- white-200 rounded-md" type="date" value={dog} onChange={(e) => setDog(e.target.value)} />
                                </div>
                                <div className="flex w-4/12 flex-col gap-1">
                                    <label htmlFor="info_deg" className='text-white'>Licence / Unique Number</label>
                                    <input id="info_deg" className="w-full p-2  border bg- white-200 rounded-md" type="text" value={lic} onChange={(e) => setLic(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 w-full justify-between">
                                <div className="flex w-5/12 flex-col gap-1">
                                    <label htmlFor="info_addr" className='text-white'>Permanent Address</label>
                                    <textarea id="info_addr" className="w-full p-2 h-28 text-start  border bg- white-200 rounded-md" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 w-full px-8 justify-center">
                                <button
                                    className="max-w-max py-2 px-4 rounded-lg bg-white text-green-800 font-semibold hover:bg-green-800 hover:text-white transition-all duration-300 mt-4" onClick={() => {const user = auth.currentUser;
                                        setUid(user.uid);setConfirm(true)}}
                                >
                                    Proceed to confirmation
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default Issue