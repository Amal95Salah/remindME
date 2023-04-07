import React from "react";

function Signout() {
  const handleSignOut = () => {
    localStorage.removeItem("token");
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}

export default Signout;
