import style from "../assets/styles/header.module.css";

export function Header() {
	return (
		<header className={style.header}>
			<a href="/">
				<h1>Countries list</h1>
			</a>
		</header>
	);
}
