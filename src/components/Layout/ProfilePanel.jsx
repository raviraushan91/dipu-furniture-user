import { useEffect, useState } from "react";
import { X, LogOut, Upload, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  logout,
  updatePassword,
  updateProfile,
} from "../../store/slices/authSlice";
import { toggleAuthPopup } from "../../store/slices/popupSlice";
const ProfilePanel = () => {
  const dispatch = useDispatch();
  const { isAuthPopupOpen } = useSelector((state) => state.popup);
  const { authUser, isUpdatingPassword, isUpdatingProfile } = useSelector(
    (state) => state.auth
  );
  const [showPwd, setShowPwd] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [pwdData, setPwdData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (authUser?.email) {
      setProfileData({
        name: authUser.name || "",
        email: authUser.email || "",
        avatar: authUser.avatar?.url || "",
      });
    }
  }, [authUser]);

  if (!authUser?.email) return null;

  const close = () => dispatch(toggleAuthPopup());

  const onAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submitProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    toast.info("Profile update request sent.");
  };

  const submitPassword = (e) => {
    e.preventDefault();
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    dispatch(updatePassword(pwdData));
    setPwdData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div
      className={`fixed inset-0 z-[75] transition-all duration-300 ${
        isAuthPopupOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      <aside className="absolute right-0 top-0 h-full w-[32rem] max-w-[95vw] glass border-l border-border overflow-y-auto">
        <div className="sticky top-0 h-16 px-5 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between">
          <h3 className="font-semibold text-lg">My Account</h3>
          <button onClick={close} className="p-2 rounded-md hover:bg-secondary">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <form onSubmit={submitProfile} className="glass-card p-4 space-y-4">
            <h4 className="font-semibold text-foreground">Profile Details</h4>

            <div className="flex items-center gap-4">
              <img
                src={profileData.avatar || "/avatar-holder.avif"}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-secondary cursor-pointer text-sm">
                <Upload className="w-4 h-4" />
                Change
                <input type="file" accept="image/*" className="hidden" onChange={onAvatarUpload} />
              </label>
            </div>

            <input
              className="w-full px-3 py-2.5 rounded-lg bg-secondary outline-none"
              placeholder="Name"
              value={profileData.name}
              onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
            />
            <input
              className="w-full px-3 py-2.5 rounded-lg bg-secondary outline-none"
              placeholder="Email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
            />
            <button
              disabled={isUpdatingProfile}
              className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold disabled:opacity-60"
            >
              {isUpdatingProfile ? "Saving..." : "Save Profile"}
            </button>
          </form>

          <form onSubmit={submitPassword} className="glass-card p-4 space-y-4">
            <h4 className="font-semibold text-foreground">Change Password</h4>
            <input
              className="w-full px-3 py-2.5 rounded-lg bg-secondary outline-none"
              placeholder="Old password"
              type={showPwd ? "text" : "password"}
              value={pwdData.oldPassword}
              onChange={(e) => setPwdData((prev) => ({ ...prev, oldPassword: e.target.value }))}
            />
            <input
              className="w-full px-3 py-2.5 rounded-lg bg-secondary outline-none"
              placeholder="New password"
              type={showPwd ? "text" : "password"}
              value={pwdData.newPassword}
              onChange={(e) => setPwdData((prev) => ({ ...prev, newPassword: e.target.value }))}
            />
            <input
              className="w-full px-3 py-2.5 rounded-lg bg-secondary outline-none"
              placeholder="Confirm new password"
              type={showPwd ? "text" : "password"}
              value={pwdData.confirmPassword}
              onChange={(e) =>
                setPwdData((prev) => ({ ...prev, confirmPassword: e.target.value }))
              }
            />
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm text-primary"
              onClick={() => setShowPwd((prev) => !prev)}
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPwd ? "Hide passwords" : "Show passwords"}
            </button>
            <button
              disabled={isUpdatingPassword}
              className="w-full py-2.5 rounded-lg border border-border hover:bg-secondary transition-colors disabled:opacity-60"
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </button>
          </form>

          <button
            onClick={() => dispatch(logout())}
            className="w-full py-2.5 rounded-lg bg-red-500/10 text-red-500 font-medium inline-flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default ProfilePanel;

