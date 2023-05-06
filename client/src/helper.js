export const isLoggedIn = () => {
    return (
        localStorage.getItem("userId") != null
    );
};