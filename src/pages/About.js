import React from 'react';
import './About.css';  // Optional if custom CSS is used

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://content.jdmagicbox.com/comp/burhanpur/n1/9999p7325.7325.170922104450.i9n1/catalogue/jijamata-polytechnic-college-burhanpur-burhanpur-government-colleges-e4fxm8koum.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-wide">
            📘 <span className="text-sky-400">About</span> Us
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Welcome to <strong className="text-sky-400">Jija Mata Govt. Polytechnic College, Burhanpur</strong>!  
            We strive to provide quality technical education that empowers students for a brighter future. 🌟
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            🧠 <span className="text-indigo-600">Who</span> We Are?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            <strong>Jija Mata Govt. Polytechnic College, Burhanpur</strong> is a premier institution offering
            state-of-the-art technical education. We are committed to bridging the gap between theory and
            practice through practical learning and industry integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-blue-700">🎯 Our Mission</h3>
            <p className="mt-3 text-gray-700">
              To provide exceptional technical education that fosters innovation and prepares students
              for success in the global workforce.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-green-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-green-700">🌍 Our Vision</h3>
            <p className="mt-3 text-gray-700">
              To become a leading institution in technical education, producing skilled professionals
              who contribute to societal and technological advancements.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50 text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            🤔 <span className="text-indigo-600">Why</span> Choose Us?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600">🏆 Experienced Faculty</h3>
            <p className="mt-3 text-gray-600">
              Our faculty members are experts in their fields with years of teaching and industry experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600">🔬 Modern Labs</h3>
            <p className="mt-3 text-gray-600">
              We offer advanced laboratories equipped with modern tools and technology for hands-on learning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600">🎓 Strong Placement</h3>
            <p className="mt-3 text-gray-600">
              Our industry tie-ups ensure students get access to top placement opportunities and internships.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-blue-600 text-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">📞 Get In Touch</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 transition">
            <h3 className="text-2xl font-semibold">🏫 Address</h3>
            <p className="mt-3">Jija Mata Govt. Polytechnic College, Burhanpur, MP</p>
          </div>

          <div className="p-6 bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 transition">
            <h3 className="text-2xl font-semibold">📧 Email</h3>
            <p className="mt-3">info@jijamatacollege.edu</p>
          </div>

          <div className="p-6 bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 transition">
            <h3 className="text-2xl font-semibold">📱 Phone</h3>
            <p className="mt-3">+91 98765 43210</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
