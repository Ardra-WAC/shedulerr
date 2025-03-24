import React from "react";

function Legend() {
  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#0F91CC",
            marginRight: "5px",
            borderRadius: "3px",
          }}
        />
        <span>Room1</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#328D83",
            marginRight: "5px",
            borderRadius: "3px",
          }}
        />
        <span>Room2</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#F3AB4F",
            marginRight: "5px",
            borderRadius: "3px",
          }}
        />
        <span>Room3</span>
      </div>
    </div>
  );
}

export default Legend;
