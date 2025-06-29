import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      }

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  if (!profileData) return null

  return (
    <div className="flex flex-col max-w-4xl gap-6 m-5 mx-auto">
      {/* Doctor Image */}
      <div>
        <img
          className="object-cover w-full max-w-xs rounded-lg bg-primary/80"
          src={profileData.image}
          alt={`${profileData.name}'s profile`}
        />
      </div>

      {/* Info Card */}
      <div className="flex-1 p-8 bg-white border rounded-lg border-stone-100">
        {/* Name, Degree, Speciality, Experience */}
        <h1 className="flex items-center gap-3 text-3xl font-semibold text-gray-700">
          {profileData.name}
        </h1>
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <p>{`${profileData.degree} - ${profileData.speciality}`}</p>
          <span className="py-0.5 px-3 border text-xs rounded-full">{profileData.experience}</span>
        </div>

        {/* About Section */}
        <section className="mt-6">
          <label className="block text-sm font-semibold text-[#262626] mb-1">About:</label>
          {isEdit ? (
            <textarea
              className="w-full p-3 text-gray-700 border rounded-md outline-primary resize-vertical"
              rows={7}
              value={profileData.about}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, about: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-600 whitespace-pre-wrap">{profileData.about}</p>
          )}
        </section>

        {/* Fees */}
        <section className="mt-6 font-medium text-gray-700">
          Appointment fee:{' '}
          {isEdit ? (
            <input
              type="number"
              className="w-32 px-3 py-1 text-gray-900 border rounded"
              value={profileData.fees}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, fees: e.target.value }))
              }
            />
          ) : (
            <span className="text-gray-900">{currency} {profileData.fees}</span>
          )}
        </section>

        {/* Address */}
        <section className="flex flex-col gap-1 mt-6 font-medium text-gray-700">
          <label>Address:</label>
          {isEdit ? (
            <>
              <input
                type="text"
                className="px-3 py-1 text-gray-900 border rounded"
                placeholder="Address Line 1"
                value={profileData.address.line1}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                type="text"
                className="px-3 py-1 text-gray-900 border rounded"
                placeholder="Address Line 2"
                value={profileData.address.line2}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </>
          ) : (
            <p className="text-gray-600 whitespace-pre-line">
              {profileData.address.line1}
              <br />
              {profileData.address.line2}
            </p>
          )}
        </section>

        {/* Availability Toggle */}
        <section className="flex items-center gap-2 mt-6 font-medium text-gray-700">
          <input
            id="availability-checkbox"
            type="checkbox"
            checked={profileData.available}
            disabled={!isEdit}
            onChange={() =>
              isEdit &&
              setProfileData((prev) => ({ ...prev, available: !prev.available }))
            }
            className="w-5 h-5 cursor-pointer accent-primary"
          />
          <label htmlFor="availability-checkbox" className={isEdit ? "cursor-pointer" : "cursor-default"}>
            Available
          </label>
        </section>

        {/* Action Buttons */}
        <div className="mt-8">
          {isEdit ? (
            <>
              <button
                onClick={updateProfile}
                className="px-6 py-2 font-semibold text-white transition border rounded-full border-primary bg-primary hover:bg-primary-dark"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEdit(false)
                  getProfileData()
                }}
                className="px-6 py-2 ml-4 text-gray-600 transition border border-gray-300 rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 font-semibold transition border rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
