import React, { useRef } from "react";
import html2canvas from "html2canvas";

const SeatingCanvas = ({ room }) => {
  const ref = useRef();

  const downloadImage = () => {
    html2canvas(ref.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${room.roomNumber}_blueprint.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div>
      <div
        ref={ref}
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${room.columns}, 60px)`,
          gap: "8px",
          padding: "10px",
          background: "#f9f9f9",
          display: "grid",
          border: "1px solid #ccc",
          width: "fit-content",
        }}
      >
        {room.seats.map((row, rowIndex) =>
          row.map((seat, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-[60px] h-[60px] flex items-center justify-center text-xs text-center rounded ${
                seat
                  ? "bg-red-500 text-white"
                  : "bg-green-200 text-gray-700 border"
              }`}
            >
              {seat ? seat.student.name.split(" ")[0] : "Empty"}
            </div>
          ))
        )}
      </div>

      <button
        onClick={downloadImage}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Download Image
      </button>
    </div>
  );
};

export default SeatingCanvas;
