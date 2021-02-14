/*global wp, settingsData */

/**
 * WordPress dependencies.
 */
const {
	Button,
	Dashicon,
} = wp.components;

const { _x } = wp.i18n;

const Header = () => {
	return (
		<header className="container bg-white relative shadow p-4">
			<h1 className="title">
				{`${settingsData.pluginInfo.name} ${settingsData.pluginInfo.settingsWord}`}
			</h1>
		</header>
	);
};

export default Header;
