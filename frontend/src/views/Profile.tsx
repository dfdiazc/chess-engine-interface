import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ProfileHeader } from "components";
import { useProfileQuery } from "features/auth/authApiSlice";

const Profile = () => {
  const { data: profileData } = useProfileQuery();
  return (
    <div className="flex flex-col">
      <Helmet>
        <style>{"body {background-color: #1d1d1f; overflow-x: hidden}"}</style>
      </Helmet>
      <ProfileHeader />
      <div className="flex flex-col px-52 py-32">
        <span className="font-roboto font-medium text-3xl text-white">
          My Data
        </span>
        <span className="my-5 w-56 h-px bg-white"></span>
        <div className="flex">
          <span className="font-roboto font-normal text-lg text-white text-center self-center">
            My email:
          </span>
          <span className="font-roboto font-light text-md text-white text-center self-center ml-3">
            {profileData?.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
