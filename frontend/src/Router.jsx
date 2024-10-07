import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { CountryDetail } from "./components/CountryDetail.jsx";
import { AllCountries } from "./components/AllCountries.jsx";

export function Router() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout></Layout>,
			children: [
				{
					index: true,
					element: <AllCountries></AllCountries>,
				},

				{
					path: "/country/:code",
					element: <CountryDetail></CountryDetail>,
				},
			],
		},
	]);

	return <RouterProvider router={router}></RouterProvider>;
}
