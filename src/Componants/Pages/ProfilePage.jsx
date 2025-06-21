import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import fetchUserProfile
import { fetchUserProfile } from "../../redux/thunks/authThunks";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user, token]);

  if (!user) return <p className="text-center mt-4">Loading user...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default ProfilePage;
