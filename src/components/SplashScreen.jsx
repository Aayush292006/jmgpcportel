import React from "react";

const SplashScreen = () => {
  const containerStyle = {
    position: "relative",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    background: "radial-gradient(circle at top left, #3e8ef7, #6c63ff, #232931)",
    animation: "bgSwirl 20s linear infinite",
    color: "white",
  };

  const particlesContainer = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 0,
  };

  // Create multiple floating circles with different sizes & animation delays
  const particleStyle = (size, left, delay) => ({
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.15)",
    width: size,
    height: size,
    left: left,
    bottom: "-100px",
    animation: `floatUp 8s ease-in-out infinite`,
    animationDelay: delay,
    filter: "blur(2px)",
  });

  const cardStyle = {
    position: "relative",
    zIndex: 1,
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255,255,255,0.05))",
    borderRadius: "30px",
    padding: "50px 80px",
    backdropFilter: "blur(25px)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    boxShadow:
      "0 8px 32px rgba(108, 99, 255, 0.4), 0 0 20px rgba(108, 99, 255, 0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "bounceIn 1.2s ease forwards",
  };

  const headingStyle = {
    fontSize: "48px",
    fontWeight: "900",
    letterSpacing: "5px",
    color: "#fff",
    textShadow:
      "0 0 12px #8c7aff, 0 0 25px #625eff, 0 0 35px #4838f2, 0 0 45px #3124d5",
    marginBottom: "30px",
    transformStyle: "preserve-3d",
    transform: "translateZ(20px)",
  };

  const loaderStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "8px solid transparent",
    borderTop: "8px solid #6c63ff",
    borderRight: "8px solid #4838f2",
    borderBottom: "8px solid #625eff",
    borderLeft: "8px solid #8c7aff",
    animation: "spinnerRotate 1.2s linear infinite",
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes bgSwirl {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes floatUp {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.15;
            }
            50% {
              opacity: 0.25;
              transform: translateY(-50px) scale(1.1);
            }
            100% {
              transform: translateY(-120vh) scale(0.8);
              opacity: 0;
            }
          }

          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: translateY(60px);
            }
            60% {
              opacity: 1;
              transform: translateY(-10px);
            }
            80% {
              transform: translateY(5px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes spinnerRotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div style={particlesContainer}>
        <div style={particleStyle("15px", "15%", "0s")}></div>
        <div style={particleStyle("20px", "35%", "2s")}></div>
        <div style={particleStyle("10px", "60%", "4s")}></div>
        <div style={particleStyle("25px", "80%", "1s")}></div>
        <div style={particleStyle("18px", "25%", "3s")}></div>
        <div style={particleStyle("12px", "70%", "5s")}></div>
      </div>

      <div style={cardStyle}>
        <h1 style={headingStyle}>JMGPC Portal</h1>
        <div style={loaderStyle}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
