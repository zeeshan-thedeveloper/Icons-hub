
const useUser = (initialValue=undefined) => {
  let user = initialValue;
  const setUser = (value) => {
    user = value;
  };

  return { user, setUser };
};

export default useUser;
