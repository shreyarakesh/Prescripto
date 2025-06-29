import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import './MyProfile.css';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  // Update user profile API call
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (!userData) return null;

  return (
    <div className="profile-container">
      <div className="profile-image-section">
        {isEdit ? (
          <label htmlFor="image-upload" className="image-upload-label">
            <img
              className="profile-image edit"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="User Profile"
            />
            {!image && <img className="upload-icon" src={assets.upload_icon} alt="Upload Icon" />}
            <input
              type="file"
              id="image-upload"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </label>
        ) : (
          <img className="profile-image" src={userData.image} alt="User Profile" />
        )}
      </div>

      <div className="profile-name-section">
        {isEdit ? (
          <input
            type="text"
            className="input-name"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <h1 className="user-name">{userData.name}</h1>
        )}
      </div>

      <hr className="divider" />

      <section className="contact-info">
        <h2 className="section-title">Contact Information</h2>

        <div className="info-row">
          <label>Email id:</label>
          <p className="info-text email">{userData.email}</p>
        </div>

        <div className="info-row">
          <label>Phone:</label>
          {isEdit ? (
            <input
              type="text"
              className="input-text"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="info-text">{userData.phone}</p>
          )}
        </div>

        <div className="info-row address-row">
          <label>Address:</label>
          {isEdit ? (
            <div className="address-inputs">
              <input
                type="text"
                className="input-text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                type="text"
                className="input-text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="info-text address-text">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </section>

      <section className="basic-info">
        <h2 className="section-title">Basic Information</h2>

        <div className="info-row">
          <label>Gender:</label>
          {isEdit ? (
            <select
              className="input-select"
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="info-text">{userData.gender}</p>
          )}
        </div>

        <div className="info-row">
          <label>Birthday:</label>
          {isEdit ? (
            <input
              type="date"
              className="input-text"
              value={userData.dob}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className="info-text">{userData.dob}</p>
          )}
        </div>
      </section>

      <div className="action-button-container">
        {isEdit ? (
          <button onClick={updateUserProfileData} className="btn btn-save">
            Save Information
          </button>
        ) : (
          <button onClick={() => setIsEdit(true)} className="btn btn-edit">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
