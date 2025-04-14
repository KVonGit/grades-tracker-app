import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { StudentDataProvider } from './contexts/StudentDataContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StudentDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
          </Routes>
        </Router>
      </StudentDataProvider>
    </AuthProvider>
  );
};

export default App;