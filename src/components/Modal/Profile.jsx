



// eslint-disable-next-line react/prop-types
const ProfileModel = ({user}) => {
    let userDecode = atob(user)
    userDecode = JSON.parse(userDecode)

  return (
    <div>
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
        <img className="w-full rounded-full"  src={userDecode.image} alt="profile" />
        </div>
        <h3 className="font-bold text-center mt-2">{userDecode.Fname.toUpperCase()} {userDecode.Lname.toUpperCase()}</h3>
        <p className="text-center font-medium">{userDecode.bio}
        </p>
    </div>
  );
};

export default ProfileModel;
