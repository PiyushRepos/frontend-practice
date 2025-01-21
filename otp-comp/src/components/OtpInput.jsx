import { useEffect, useRef, useState } from "react";

function OtpInput({ length = 4, onSubmit }) {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const inpRefs = useRef([]);

  useEffect(() => {
    inpRefs.current[0].focus();
  }, []);

  const handleChange = (e, index) => {
    let value = e.target.value;
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.code === "Backspace" && !otp[index] && index > 0) {
      inpRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    let paste = e.clipboardData.getData("text");
    if (isNaN(paste) || paste?.length < length) return;

    let pastedOtp = paste.substring(0, length).split("");
    setOtp(pastedOtp);
  };

  return (
    <form className="container" onSubmit={() => onSubmit(otp.join(""))}>
      <div>
        {otp.map((value, index) => (
          <input
            ref={(inp) => (inpRefs.current[index] = inp)}
            type="text"
            value={value}
            key={index}
            className="otpInput"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() =>
              inpRefs.current[index].setSelectionRange(1, length - 1)
            }
            onPaste={(e) => handlePaste(e)}
          />
        ))}
      </div>
      <button disabled={otp.includes("")}>Sumbit</button>
    </form>
  );
}

export default OtpInput;
