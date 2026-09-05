const RequireAuth = ({ children }) => {
  const user = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default RequireAuth;