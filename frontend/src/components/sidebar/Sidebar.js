import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = ({ isOpenSideBar }) => {
	return (

		<div className={`p-4 md:w-2/5 ${!isOpenSideBar ? 'hidden' : ''} md:flex flex-col border-r border-slate-500`}>
			<SearchInput />
			<div className='divider px-3 my-1'></div>
			<Conversations />
			<LogoutButton />
		</div>


	);
};
export default Sidebar;