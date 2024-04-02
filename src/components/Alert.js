import React, { useEffect, useState } from "react";

function Alert(props) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);
  return (
    <>
      {isVisible && (
        <div className="alert alert-primary" role="alert">
          {props.message}
        </div>
      )}
    </>
  );
};

export default Alert;
