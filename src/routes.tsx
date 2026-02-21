import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import { Onboarding } from "./pages/Onboarding";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Pricing } from "./pages/Pricing";
import { SchoolERP } from "./pages/SchoolERP";
import { AdminSchoolERP } from "./pages/AdminSchoolERP";
import { StudentDashboard } from "./pages/StudentDashboard";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { ParentDashboard } from "./pages/ParentDashboard";
import { OfficeHRMS } from "./pages/OfficeHRMS";
import { HospitalHMS } from "./pages/HospitalHMS";
import { ClassManagement } from "./pages/ClassManagement";
import { AttendanceManagement } from "./pages/AttendanceManagement";
import { GradeManagement } from "./pages/GradeManagement";
import { FeeManagement } from "./pages/FeeManagement";
import { MessagingSystem } from "./pages/MessagingSystem";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "onboarding", Component: Onboarding },
      { path: "login", Component: Login },
      { path: "pricing", Component: Pricing },
      { path: "dashboard/:industry?", Component: Dashboard },
      { path: "school-erp", Component: () => <ProtectedRoute><SchoolERP /></ProtectedRoute> },
      { path: "admin-erp", Component: () => <ProtectedRoute requiredRole={["admin"]}><AdminSchoolERP /></ProtectedRoute> },
      { path: "classes", Component: () => <ProtectedRoute><ClassManagement /></ProtectedRoute> },
      { path: "attendance", Component: () => <ProtectedRoute><AttendanceManagement /></ProtectedRoute> },
      { path: "grades", Component: () => <ProtectedRoute><GradeManagement /></ProtectedRoute> },
      { path: "fees", Component: () => <ProtectedRoute><FeeManagement /></ProtectedRoute> },
      { path: "messages", Component: () => <ProtectedRoute><MessagingSystem /></ProtectedRoute> },
      { path: "student-dashboard", Component: () => <ProtectedRoute requiredRole={["student"]}><StudentDashboard /></ProtectedRoute> },
      { path: "teacher-dashboard", Component: () => <ProtectedRoute requiredRole={["teacher"]}><TeacherDashboard /></ProtectedRoute> },
      { path: "parent-dashboard", Component: () => <ProtectedRoute requiredRole={["parent"]}><ParentDashboard /></ProtectedRoute> },
      { path: "office-hrms", Component: () => <ProtectedRoute><OfficeHRMS /></ProtectedRoute> },
      { path: "hospital-hms", Component: () => <ProtectedRoute><HospitalHMS /></ProtectedRoute> },
    ],
  },
]);
