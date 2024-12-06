import React, { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FiUser, FiCalendar, FiMail, FiMessageSquare, FiUpload, FiEye, FiLock } from "react-icons/fi";

const LoginPage = ({ onSkip, onStudentLogin, onAdminLogin, onRegister }) => {
  const [loginType, setLoginType] = useState("student");
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginType === "admin") {
      onAdminLogin(credentials);
    } else {
      onStudentLogin(credentials);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Event Hub</h2>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setLoginType("student")}
            className={`flex-1 py-2 rounded ${loginType === "student" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Student
          </button>
          <button
            onClick={() => setLoginType("admin")}
            className={`flex-1 py-2 rounded ${loginType === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Admin
          </button>
        </div>
        <form onSubmit={handleLogin} className="mb-4">
          <div className="mb-4">
            <div className="flex items-center border rounded">
              <FiMail className="mx-2 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 p-2 outline-none"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border rounded">
              <FiLock className="mx-2 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                className="flex-1 p-2 outline-none"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col gap-2">
          <button
            onClick={onRegister}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            New Registration
          </button>
          <button
            onClick={onSkip}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Skip Login
          </button>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ title, description, date, image, onRegister }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{date}</span>
          <button
            onClick={onRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const RegistrationForm = ({ event, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Register for {event.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <div className="flex items-center border rounded">
              <FiUser className="mx-2 text-gray-500" />
              <input
                type="text"
                className="flex-1 p-2 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="flex items-center border rounded">
              <FiMail className="mx-2 text-gray-500" />
              <input
                type="email"
                className="flex-1 p-2 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <div className="flex items-center border rounded">
              <FiCalendar className="mx-2 text-gray-500" />
              <input
                type="date"
                className="flex-1 p-2 outline-none"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <div className="flex items-center border rounded">
              <FiMessageSquare className="mx-2 text-gray-500" />
              <textarea
                className="flex-1 p-2 outline-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <div className="flex items-center border rounded p-2">
              <FiUpload className="mr-2 text-gray-500" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminView = ({ registrations }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Registered Students</h2>
      <div className="grid gap-6">
        {registrations.map((reg, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start gap-4">
              <img
                src={reg.image}
                alt={reg.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{reg.name}</h3>
                <p className="text-gray-600">{reg.email}</p>
                <p className="text-gray-500 text-sm">{reg.date}</p>
                <p className="text-gray-700 mt-2">{reg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventManagement = () => {
  const [currentView, setCurrentView] = useState("login");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [userType, setUserType] = useState(null);

  const events = [
    {
      title: "Annual Sports Meet",
      description: "Join us for an exciting day of sports and competition",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
    },
    {
      title: "Marathon 2024",
      description: "Run for a cause in our annual marathon event",
      date: "2024-04-01",
      image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3"
    },
    {
      title: "Startup Summit",
      description: "Connect with entrepreneurs and innovators",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b"
    },
    {
      title: "College Fest",
      description: "Annual cultural extravaganza",
      date: "2024-03-25",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94"
    }
  ];

  const handleStudentLogin = (credentials) => {
    setUserType("student");
    setCurrentView("events");
  };

  const handleAdminLogin = (credentials) => {
    setUserType("admin");
    setCurrentView("admin");
  };

  const handleNewRegistration = () => {
    setCurrentView("register");
  };

  const handleRegistration = (formData) => {
    setRegistrations([...registrations, { ...formData, event: selectedEvent }]);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === "login" && (
        <LoginPage
          onSkip={() => setCurrentView("events")}
          onStudentLogin={handleStudentLogin}
          onAdminLogin={handleAdminLogin}
          onRegister={handleNewRegistration}
        />
      )}

      {currentView === "events" && (
        <div className="container mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Available Events</h1>
            <button
              onClick={() => setCurrentView("admin")}
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              <FiEye /> View Registrations
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard
                key={index}
                {...event}
                onRegister={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      )}

      {currentView === "admin" && (
        <div className="container mx-auto">
          <div className="flex justify-between items-center p-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => setCurrentView("events")}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Back to Events
            </button>
          </div>
          <AdminView registrations={registrations} />
        </div>
      )}

      {selectedEvent && (
        <RegistrationForm
          event={selectedEvent}
          onSubmit={handleRegistration}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default EventManagement;