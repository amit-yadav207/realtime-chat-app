
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className='mt-1'>
      {!loading ? (
        <BiLogOut className='w-6 h-6 text-white cursor-pointer hover:text-sky-400 rounded-md ' onClick={logout} title="logout"/>
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  );
};
export default LogoutButton;