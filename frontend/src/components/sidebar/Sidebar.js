import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (

		<div className={`p-4 md:w-2/5 md:flex flex-col border-r border-slate-400 `}>
			<SearchInput />
			<div className='divider px-3 my-1'></div>
			<Conversations />
			<LogoutButton />
			<hr className="md:hidden text-gray-500 my-2"></hr>
		</div>


	);
};
export default Sidebar;