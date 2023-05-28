import React, { useEffect, useState } from 'react';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './frb'
function App({ margin,setVerified}) {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const verified=localStorage.getItem('verified');
    useEffect(() => {
        const auth = getAuth();
        // Listen for changes in the user authentication state
        if(verified==null || verified===false){

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Get the current user's ID token
                getIdTokenResult(user)
                    .then((idTokenResult) => {
                        const uid = user.uid;

                        // Access the Firestore document for the user using the UID
                        // Replace 'users' with the appropriate Firestore collection name
                        const firestore = getFirestore(app);
                        const userDocRef = doc(firestore, 'users', uid);

                        getDoc(userDocRef)
                            .then((docSnapshot) => {
                                if (docSnapshot.exists()) {
                                    // Get the value of 'isVerified' field from the document
                                    setLoading(false)
                                    const isVerifiedValue = docSnapshot.data().isVerified;
                                    // Update the state based on the 'isVerified' value
                                    setIsVerified(isVerifiedValue);
                                    setVerified(isVerifiedValue);
                                    if(isVerified===true){
                                        localStorage.setItem('verified',true)
                                    }
                                } else {
                                    console.log("User document does not exist");
                                }
                            })
                            .catch((error) => {
                                console.log("Error fetching user document:", error);
                            });
                    })
                    .catch((error) => {
                        console.log("Error getting ID token:", error);
                    });
            }
        });
        return () => {
            // Unsubscribe from the auth state listener when component unmounts
            unsubscribe();
        };
    }
    else{
        setIsVerified(JSON.parse(verified))
        setVerified(JSON.parse(verified))
        setLoading(false)
    }

    }, [setIsVerified,isVerified,setVerified,verified]);

    return (
        <div>
            {loading ? (<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div className="bg-white p-8 rounded-lg">
                    <div className="loader"></div>
                </div>
            </div>) :
                !isVerified && (<div className={`content transition-all duration-500 flex flex-wrap content-center h-screen justify-center ease-in-out  ml-${margin ? "80 dashOpen" : "100 dashClosed"}`}>
                    <div className="grad w-full rounded-xl">
                        <div className="flex flex-col gap-5 content-center items-center mt-3 mb-4">
                            <div className="font-bold text-2xl text-white text-center">Your organization is not verified yet</div>
                            <div className="flex flex-row flex-wrap gap-5 items-center justify-center">
                                <div className="doodle ease-in-out transition-all duration-500"><img src={`/doodle_${margin ? 'l' : 's'}.svg`} alt="" srcset="" /></div>
                                <div className="text-xl w-1/2 font-medium text-white">Your organization is not verified yet you need to verify your account before using this section</div>
                            </div>
                            <button class="bg-white border-[#21A494] backdrop-filter max-w-max backdrop-blur-lg py-2 px-4 shadow-md text-white rounded-lg hover:bg-opacity-90 duration-300 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center flex flex-row align-center gap-3 " ><div className='text-center text-[#64B5E2] h-full flex flex-wrap content-center'>Verify your organization</div></button>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
}

export default App;

