import React, { useContext, useEffect, useState } from 'react';
import LogContext from '../contexts/logContext';

const Profile = () => {
  const context = useContext(LogContext);
  const {isSeller} = context
  const [profile, setProfile] = useState({});
  const url = "https://e-commerce-cyan-nine.vercel.app/api";
  console.log(isSeller)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(isSeller ? `${url}/sellers/sellerviewprofile` : `${url}/buyers/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: localStorage.getItem('Token'),
          },
        });
        const json = await response.json();
        setProfile(json.data);
        console.log(profile);
        console.log(isSeller);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Profile</h5>
              {!isSeller && (
                  <>
                    <div className='border border-dark'>
                      <img src={profile.avatarImg} alt="" />
                    </div>
                  </>
                )}
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Name:</strong> {isSeller ? profile.ownerName : profile.name}</li>
                <li className="list-group-item"><strong>Email:</strong> {profile.email}</li>
                <li className="list-group-item"><strong>Mobile:</strong> {profile.mobile}</li>
                <li className="list-group-item"><strong>Address:</strong> {profile.address && `${profile.address.firstLine}, ${profile.address.secondLine}, ${profile.address.landmark}, ${profile.address.city} - ${profile.address.pincode}`}</li>
                {isSeller && (
                  <>
                    <li className="list-group-item"><strong>Owner Name:</strong> {profile.vendorName}</li>
                    <li className="list-group-item"><strong>GST Number:</strong> {profile.gstNumber}</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
