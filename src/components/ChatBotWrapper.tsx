import { useLocation } from 'react-router-dom';
import ChatBot from './ChatBot';

const pageContexts: Record<string, string> = {
  '/': 'Home page - Main landing page of Rubiri Senior School',
  '/about': 'About page - School history, mission, vision, and values',
  '/academics': 'Academics page - Academic programs, subjects, and curriculum information',
  '/cbc': 'CBC Curriculum page - Competency-Based Curriculum details and implementation',
  '/school-placement': 'School Placement page - Information about student placement and transfers',
  '/kuccps': 'KUCCPS page - Kenya Universities and Colleges Central Placement Service guidance',
  '/helb': 'HELB page - Higher Education Loans Board application guidance',
  '/career-guidance': 'Career Guidance page - Career planning, clusters, and mentorship programs',
  '/cv-builder': 'CV Builder page - Tool for creating professional resumes',
  '/co-curricular': 'Co-Curricular page - Sports, clubs, music, drama, and activities',
  '/teachers': 'Teachers page - Faculty information and teaching staff',
  '/admissions': 'Admissions page - Enrollment process and requirements',
  '/alumni': 'Alumni page - Former students, success stories, and alumni network',
  '/gallery': 'Gallery page - Photos and memories from school events',
  '/uniform': 'Uniform page - School uniform requirements and guidelines',
  '/contact': 'Contact page - School contact information and inquiry form',
  '/portal': 'Portal page - Login portal for students, teachers, alumni, and staff',
  '/portal/auth': 'Portal Authentication - Login and registration',
  '/portal/dashboard': 'Portal Dashboard - User dashboard with materials and profile',
  '/portal/admin': 'Admin Dashboard - User management, registration approvals, and access control',
};

const ChatBotWrapper = () => {
  const location = useLocation();
  const context = pageContexts[location.pathname] || `Current page: ${location.pathname}`;
  
  return <ChatBot context={context} />;
};

export default ChatBotWrapper;
