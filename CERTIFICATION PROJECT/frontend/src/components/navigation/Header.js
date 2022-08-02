import { useSelector } from "react-redux";
import AdminNavigation from "./AdminNavigation";
import UserNavigation from "./UserNavigation";
export function Header() {
  var auth = useSelector((state) => state.auth);
  return (
    <div>
      {auth.accessToken !== "" && auth.isAdmin && (
        <AdminNavigation auth={auth}></AdminNavigation>
      )}
      {auth.accessToken !== "" && !auth.isAdmin && (
        <UserNavigation auth={auth}></UserNavigation>
      )}
    </div>
  );
}
