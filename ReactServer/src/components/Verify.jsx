import React, { useEffect } from 'react'

import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Header from './HeadersFooters/Header';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [credentialId, setcredentialId] = useState('');
  const [licenseInfo, setLicenseInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleInputChange = (e) => {
    setcredentialId(e.target.value);
  };

  const verifyLicense = () => {
    setLoader(true)
    axios
      .post('http://34.131.172.11:5000/api/credentials/verify', { credentialId: credentialId })
      .then((response) => {
        const data = response.data;
        console.log(data.isValid);
          // License is valid, fetch more info
          fetchLicenseInfo();
      })
      .catch((error) => {
        // Error occurred during the request
        setError('An error occurred while verifying the license');
      });
  };

  const fetchLicenseInfo = () => {
    axios
      .post('http://34.131.172.11:5000/api/credentials/get', { licenseNumber: credentialId })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setLicenseInfo(data);

        setLoader(false)

      })
      .catch((error) => {
        setError('An error occurred while fetching license information');
      });
  };
  useEffect(() => {
    setcredentialId(searchParams.get("credentialId"))
    if (searchParams.get('credentialId')) {
      setcredentialId(searchParams.get('credentialId'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [setcredentialId, searchParams])

  return (<>
    <div className="grad min-h-screen flex flex-col">
      <Header />
      <div className="grad min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-max bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-4">License Verification Page</h1>
          <input
            type="text"
            value={credentialId}
            onChange={handleInputChange}
            placeholder="Enter Credential ID"
            className="border border-gray-300 rounded-md py-2 px-4 mb-4 w-full"
          />
          <button
            onClick={verifyLicense}
            className="bg-green-500 hover:bg-green-600 text-white flex flex-row justify-center items-center gap-4 font-semibold py-2 px-4 rounded-md w-full"
          >{loader && <div className="loader"></div>}Verify License</button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {licenseInfo && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">License Information</h2>
              <p>
                Name of the doctor: <span className="font-medium">{licenseInfo.doctorName}</span>
              </p>
              <p>
                Certificate Status:{" "}
                <span className={licenseInfo.isValid ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                  {licenseInfo.isValid ? "Valid" : "Suspended"}
                </span>
              </p>
              <p className="overflow-ellipsis w-30">
                Transaction Hash:{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${licenseInfo.transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 flex overflow-ellipsis w-20 underline"
                >
                  {licenseInfo.transactionHash.substring(0, 20)}...
                </a>
              </p>
              <p>
                Block Number: <span className="font-medium">{licenseInfo.blockNumber}</span>
              </p>
              {/* Add more license information fields as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  </>
  );
};

export default Verify;
