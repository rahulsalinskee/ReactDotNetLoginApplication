
import { useNavigate } from "react-router-dom";

function LogoutLink(props: { children: React.ReactNode }) {

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""
        }).then((data) => {
            if (data.ok) {
                navigate("/login");
            }
            else {
                console.error("Logout failed");
            }
        }).catch((error) => {
            console.error(error);
        })
    };

    return (
        <>
            <a href="#" onClick={handleSubmit}>{props.children}</a>
        </>
    );
}

export default LogoutLink;