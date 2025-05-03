import React from "react";

const AdminFooter = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-4 mt-10 shadow-inner">
      <div className="text-center text-sm">
        © {new Date().getFullYear()} Jija Mata Government Polytechnic College Burhanpur. All rights reserved.
      </div>
    </footer>
  );
};

export default AdminFooter;
