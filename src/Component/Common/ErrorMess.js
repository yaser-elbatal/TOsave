import React from "react";

export const ErrorMess = ({ error }) => {
  return (
    <>
      {error && (
        <div
          style={{
            backgroundColor: "red",
            textAlign: "center",
            padding: 5,
            color: "wheat",
            borderRadius: 5,
            marginTop: 10,
            width: "50%",
            margin: "auto",
          }}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default ErrorMess;
