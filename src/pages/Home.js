import React from 'react';
import './Home.css';
import "../index.css";

const Home = () => {
  return (
    <div className="homepage">

      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://content.jdmagicbox.com/comp/burhanpur/n1/9999p7325.7325.170922104450.i9n1/catalogue/jijamata-polytechnic-college-burhanpur-burhanpur-government-colleges-e4fxm8koum.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4 md:px-10">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-wide drop-shadow-sm">
            Jijamata Government Polytechnic College, Burhanpur
          </h1>
          <p className="text-md md:text-xl font-medium text-blue-300 mb-2 max-w-2xl leading-snug">
            Shaping the Future with Skill and Purpose Since 1960
          </p>
          <p className="text-sm md:text-lg text-gray-200 max-w-2xl">
            Redefining examination management through technology. Our smart seating system guarantees accuracy, impartiality, and a smooth conduct of exams.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <a
              href="/StudentSeating"
              className="px-5 py-2.5 bg-blue-600 text-white text-sm md:text-base font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              📅 View Time Table
            </a>
            <a
              href="/Examseating"
              className="px-5 py-2.5 bg-green-600 text-white text-sm md:text-base font-medium rounded-md shadow-md hover:bg-green-700 transition duration-300"
            >
              🪑 View Seating Details
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-blue-700 transition-all duration-500 ease-in-out transform hover:scale-105">
              📘 About Exam Seating System
            </h2>
            <p className="mt-4 text-lg text-gray-600 opacity-90 transition-opacity duration-500 ease-in-out hover:opacity-100">
              Our system automates the allocation of student seating to prevent unfair practices and ensure smooth exam execution.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-indigo-50">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2 transition-colors duration-300 ease-in-out hover:text-indigo-700">🤖 Automated Allocation</h3>
              <p className="mt-2 text-gray-600 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
                Seats are assigned dynamically based on predefined rules.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-green-50">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2 transition-colors duration-300 ease-in-out hover:text-indigo-700">🧭 Hall Monitoring</h3>
              <p className="mt-2 text-gray-600 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
                Supervisors can track real-time seating and manage invigilators.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-yellow-50">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2 transition-colors duration-300 ease-in-out hover:text-indigo-700">🔒 Cheating Prevention</h3>
              <p className="mt-2 text-gray-600 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
                Ensures students from different subjects are seated alternately.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Seating Details Section */}
      <section id="seating-details" className="py-20 bg-gradient-to-br from-white via-green-50 to-white text-gray-800">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-green-700 tracking-tight drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">
              🪑 Exam Seating Details
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed opacity-90 transition-opacity duration-500 ease-in-out hover:opacity-100">
              Stay informed about your seat, hall, and entry time—anytime, anywhere—with our automated seat allocation system.
            </p>
          </div>

          {/* Grid Info Cards */}
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[{
              title: "📌 Accurate Seat Allocation",
              desc: "Prevents last-minute confusion by allocating seats and halls ahead of time with clarity."
            }, {
              title: "🕒 Timely Entry Info",
              desc: "Gives exact entry timing to ensure smooth crowd control and punctuality."
            }, {
              title: "📱 Digital Access",
              desc: "Students can view seat details on their mobile or dashboard—no paper needed."
            }, {
              title: "✅ Organized Crowd Management",
              desc: "Streamlines entry and avoids overcrowding through proper guidance."
            }, {
              title: "📊 Real-Time Updates",
              desc: "Seat changes? No problem. Updates reflect live without reissuing hall tickets."
            }, {
              title: "🔒 Transparent & Secure",
              desc: "Prevents impersonation and ensures seating integrity using verified data only."
            }].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 ease-in-out border border-green-100 hover:bg-green-50"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 transition-colors duration-300 ease-in-out hover:text-green-700">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-16 flex justify-center">
            <a
              href="/Examseating"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              🔍 View My Seat Details
            </a>
          </div>
        </div>
      </section>



      {/* Exam Guidelines Section */}
      <section id="rules" className="py-16 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-red-600 transition-all duration-500 ease-in-out transform hover:scale-105">
              📋 Exam Guidelines
            </h2>
            <p className="mt-4 text-lg text-gray-600 opacity-90 transition-opacity duration-500 ease-in-out hover:opacity-100">
              Please follow the below instructions to maintain exam integrity.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-blue-50 transition-all duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-red-600 mb-2 transition-colors duration-300 ease-in-out hover:text-red-700">🚫 No Electronic Devices</h3>
              <p className="mt-2 text-gray-600 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
                Mobile phones, calculators, and smartwatches are strictly prohibited.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-green-50 transition-all duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-green-600 mb-2 transition-colors duration-300 ease-in-out hover:text-green-700">✅ Bring ID & Admit Card</h3>
              <p className="mt-2 text-gray-600 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
                Students must carry their university ID and hall ticket.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-yellow-50 transition-all duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-yellow-600 mb-2 transition-colors duration-300 ease-in-out hover:text-yellow-700">⏳ Be On Time</h3>
              <p className="mt-2 text-gray-600 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
                Late entries will not be allowed after 15 minutes from the start.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-blue-50 transition-all duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-blue-600 mb-2 transition-colors duration-300 ease-in-out hover:text-blue-700">📢 Follow Instructions</h3>
              <p className="mt-2 text-gray-600 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
                Listen to invigilators and follow all examination rules.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
