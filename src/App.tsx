import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { SchoolERPProvider } from './context/SchoolERPContext';

export default function App() {
  return (
    <SchoolERPProvider>
      <RouterProvider router={router} />
    </SchoolERPProvider>
  );
}
