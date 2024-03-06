import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Nav({ brandText, menuItems }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar navbar-light navbar-expand-md">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
          {brandText}
        </Link>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index} onClick={handleClose}>
              <Link to={item.link} className="nav-link active">
                {item.text}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </nav>
  );
}

export default Nav;
