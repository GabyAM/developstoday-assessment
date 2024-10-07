import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import style from "../assets/styles/layout.module.css";

export function Layout() {
	return (
		<div className={style.layout}>
			<Header></Header>
			<div className={style.content}>
				<Outlet></Outlet>
			</div>
		</div>
	);
}
