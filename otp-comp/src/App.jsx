import OtpInput from "./components/OtpInput";

function App() {
  const onSubmit = (otp) => {
    alert(`One Time Password ${otp}`);
  };
  return (
    <>
      <div className="main-container">
        <h1 style={{ textAlign: "center" }}>One Time Password (OTP)</h1>
        <OtpInput length={4} onSubmit={onSubmit} />
        {/* <OtpInput length={6} onSubmit={onSubmit} /> */}
      </div>
    </>
  );
}

export default App;
