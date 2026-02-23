import { useEffect, useState } from "react";
import { X, Phone, ShieldCheck, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  resetOtpFlow,
  sendMobileOtp,
  verifyMobileOtp,
} from "../../store/slices/authSlice";
import { toggleAuthPopup } from "../../store/slices/popupSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthPopupOpen } = useSelector((state) => state.popup);
  const {
    authUser,
    isSendingOtp,
    isVerifyingOtp,
    otpSentPhone,
  } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (authUser?.id && authUser?.role === "User" && isAuthPopupOpen) {
      dispatch(toggleAuthPopup());
    }
  }, [authUser, isAuthPopupOpen, dispatch]);

  useEffect(() => {
    if (isAuthPopupOpen) {
      setName("");
      setPhone("+91");
      setOtp("");
      dispatch(resetOtpFlow());
    }
  }, [location.pathname, isAuthPopupOpen, dispatch]);

  const close = () => dispatch(toggleAuthPopup());
  const isOtpStep = Boolean(otpSentPhone);

  const requestOtp = (e) => {
    e.preventDefault();
    dispatch(sendMobileOtp({ phone }));
  };

  const verifyOtpAndLogin = (e) => {
    e.preventDefault();
    dispatch(
      verifyMobileOtp({
        phone: otpSentPhone,
        otp,
        name,
      })
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[70] transition-all duration-300 ${
        isAuthPopupOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      <div className="relative min-h-full px-4 py-10 grid place-items-center">
        <div className="w-full max-w-md glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {isOtpStep ? "Verify OTP" : "Login with Mobile"}
            </h2>
            <button onClick={close} className="p-2 rounded-md hover:bg-secondary" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>

          {!isOtpStep ? (
            <form onSubmit={requestOtp} className="space-y-4">
              <label className="block">
                <span className="text-sm text-muted-foreground">Your name (optional)</span>
                <div className="mt-1 flex items-center gap-2 px-3 py-3 rounded-lg bg-secondary">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    placeholder="Name (for new account)"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-muted-foreground">Mobile number</span>
                <div className="mt-1 flex items-center gap-2 px-3 py-3 rounded-lg bg-secondary">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    placeholder="+91XXXXXXXXXX"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-semibold disabled:opacity-60"
              >
                {isSendingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtpAndLogin} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                OTP sent to <span className="text-foreground font-medium">{otpSentPhone}</span>
              </p>

              <label className="block">
                <span className="text-sm text-muted-foreground">Enter 6-digit OTP</span>
                <div className="mt-1 flex items-center gap-2 px-3 py-3 rounded-lg bg-secondary">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                  <input
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 bg-transparent outline-none text-sm tracking-[0.2em]"
                    placeholder="000000"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isVerifyingOtp}
                className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-semibold disabled:opacity-60"
              >
                {isVerifyingOtp ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                type="button"
                onClick={() => dispatch(sendMobileOtp({ phone: otpSentPhone }))}
                className="w-full py-2.5 rounded-lg border border-border hover:bg-secondary transition-colors text-sm"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={() => dispatch(resetOtpFlow())}
                className="w-full py-2.5 rounded-lg border border-border hover:bg-secondary transition-colors text-sm"
              >
                Change Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

