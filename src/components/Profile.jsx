import React, { useContext, useEffect, useState } from 'react';
import LogContext from '../contexts/logContext';

const Profile = () => {
  const context = useContext(LogContext);
  const { isSeller } = context;
  const [profile, setProfile] = useState({
    avatarImg: "",
    buyerName: "",
    ownerName: "",
    vendorName: "",
    mobile: "",
    email: "",
    gstNumber: "",
    address:{
      firstLine: "",
      secondLine: "",
      pincode: "",
      landmark: "",
      city: ""
    }
  });
  const url = "https://e-commerce-cyan-nine.vercel.app/api";

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        isSeller ? `${url}/sellers/sellerviewprofile` : `${url}/buyers/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: localStorage.getItem('Token'),
          },
        }
      );
      const json = await response.json();
      setProfile(json.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadPhoto = async () => {
    try {
      if (!selectedFile) {
        console.log("No file selected.");
        return;
      }
      const formData = new FormData();
      formData.append('avatarImg', selectedFile);
  
      const response = await fetch(`${url}/buyers/updateProfile`,
        {
          method: isSeller ? "PUT" : "POST",
          headers: {
            "Token": localStorage.getItem('Token'),
          },
          body: formData
        }
      );
  
      if (response.status) {
        fetchProfile();
      } else {
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }));
    } else {
      setProfile(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        isSeller ? `${url}/sellers/sellerupdateprofile` : `${url}/buyers/updateProfile`,
        {
          method: isSeller ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "Token": localStorage.getItem('Token'),
          },
          body: JSON.stringify(profile)
        }
      );
      const json = await response.json();
      console.log(json);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (

    <>
    {
      profile ?  
      (<div className="container my-4">
      <div className="row justify-content-center mt-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center fs-1">Profile</h5>
              
              {!isSeller && (
                <div>
                  <img height="150px" width="150px" src={profile.avatarImg} alt="Unable to Load" className='m-auto border border-dark my-2 d-block'/>
                  <br/>
                  <input type="file" name="avatarImg" className="form-control" onChange={handleFileChange}/>
                  <p className='text-end'> 
                  <button className='btn btn-dark mt-2'  onClick={uploadPhoto}>Change Picture</button>
                  </p>
                </div>
              )}


              <p className='text-danger mt-4'>Personal Details </p>

                
              { !isSeller && (
                <div className="mb-3">
                  <label htmlFor="buyerName" className="form-label">Name:</label>
                  <input type="text" className="form-control" name="buyerName" value={profile.buyerName} onChange={handleChange}/>
                </div>
                  )
              }

              { isSeller && (
                <div className="mb-3">
                  <label htmlFor="ownerName" className="form-label">Name:</label>
                  <input type="text" className="form-control" name="ownerName" value={profile.ownerName} onChange={handleChange}/>
                </div> 
              )}

              { isSeller && (
                <div className="mb-3">
                  <label htmlFor="vendorName" className="form-label">Owner Name:</label>
                  <input type="text" className="form-control" name="vendorName" value={profile.vendorName} onChange={handleChange}/>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="text" className="form-control" name="email" value={profile.email}/>
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile:</label>
                <input type="text" className="form-control" name="mobile" value={profile.mobile} onChange={handleChange}/>
              </div>

              { isSeller && (
                <div className="mb-3">
                    <label htmlFor="gstNumber" className="form-label">GST Number:</label>
                    <input type="text" className="form-control" name="gstNumber" value={profile.gstNumber} onChange={handleChange}/>
                  </div>
              )}

              <p className='text-danger'> {isSeller ? "Ware House Address" : "Delivery Address" }</p>
              
              <div className="mb-3">
                <label htmlFor="firstLine" className="form-label">FirstLine:</label>
                <input type="text" className="form-control" name="address.firstLine" value={profile.address.firstLine} onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <label htmlFor="secondLine" className="form-label">SecondLine:</label>
                <input type="text" className="form-control" name="address.secondLine" value={profile.address.secondLine} onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <label htmlFor="landmark" className="form-label">Landmark:</label>
                <input type="text" className="form-control" name="address.landmark" value={profile.address.landmark} onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="form-label">City:</label>
                <input type="text" className="form-control" name="address.city" value={profile.address.city} onChange={handleChange}/>
              </div>

              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">Pincode:</label>
                <input type="text" className="form-control" name="address.pincode" value={profile.address.pincode} onChange={handleChange}/>
              </div>
            </div>
          </div>
            <button className='btn btn-dark m-4 w-50' onClick={updateUser} >Update Changes</button>
      </div>
    </div>) : (<p className='fs-1 text-center'>Please Login</p>)
  }
  </>

  );
};

export default Profile;
