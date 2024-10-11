import { lazy } from 'react';
import PrivateRoute from './PrivateRoute';  // Import the PrivateRoute component

const Index = lazy(() => import('../pages/Analytics'));
const ManagentNetWork = lazy(() => import('../pages/ManagentNetWork'));
const NewHospital = lazy(() => import('../pages/NewHospital'));
const LoginBoxed = lazy(() => import('../pages/LoginBoxed'));
const Error = lazy(() => import('../components/Error'));
const HospitalApproval = lazy(() => import('../pages/HospitalApproval'));
const HospitalManagent = lazy(() => import('../pages/HospitalManagent'));

const routes = [
    // dashboard (protected)
    {
        path: '/',
        element: (
            <PrivateRoute>
                <Index />
            </PrivateRoute>
        ),
    },
    // Managent network (protected)
    {
        path: '/managent-network',
        element: (
            <PrivateRoute>
                <ManagentNetWork />
            </PrivateRoute>
        ),
    },
    // Hospital approval (protected)
    {
        path: '/hospital-approval',
        element: (
            <PrivateRoute>
                <HospitalApproval />
            </PrivateRoute>
        ),
    },
    {
        path: '/hospital-managent',
        element: (
            <PrivateRoute>
                <HospitalManagent />
            </PrivateRoute>
        ),
    },
    // New hospital (protected)
    {
        path: '/new-hospital',
        element: (
            <PrivateRoute>
                <NewHospital />
            </PrivateRoute>
        ),
    },
    // Login page (public)
    {
        path: '/login',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    // Error page (public)
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
