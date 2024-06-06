import { LaptopChromebook, Logout } from "@mui/icons-material"; // Import Logout icon
import { Avatar, IconButton } from "@mui/material"; // Import IconButton
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Implement logout functionality here
        console.log("Logout clicked");
        // Navigate to /login route
        navigate("/login");
    };

    return (
        <div className="text-purple-600 bg-white flex justify-between items-center py-6 px-8 sticky top-0 z-50">
            <div className="flex items-center">
                <div className="flex gap-3 items-center">
                    <div className="text-4xl font-bold">
                        Admin <LaptopChromebook fontSize="36px" />
                    </div>
                    <IconButton
                        onClick={handleLogout}
                        color="inherit"
                        style={{ width: '50px', color: 'lightgray' }} // Added custom styles
                    >
                        <Logout />
                    </IconButton>
                </div>
            </div>
            <Avatar
                alt="Remy Sharp"
                src="https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg&w=580&q=80"
            />
        </div>
    );
};

export default TopBar;
