import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboardProvider from './utils/context/admin-state-context/AdminContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AdminDashboardProvider>
				<App />
			</AdminDashboardProvider>
		</BrowserRouter>
	</StrictMode>
);
