import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { FiMenu } from "react-icons/fi";

const pages = [
  "Our Funds",
  "Our Story",
  "3iQ in the News",
  "Crypto 101",
  "Contact Us",
  "Subscribe"
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" sx={{ bgcolor: "white", pb: 4 }}>
      <Toolbar disableGutters>
        <Box
          component="img"
          sx={{
            maxWidth: "14%",
            mt: 3,
            mb: 3,
            ml: 4
          }}
          alt="3iq"
          src={'/assets/3iq-logo.png'}
        />

        <Box sx={{ ml: "auto", mr: 10, display: { xs: "none", md: "flex" } }}>
          tw lin yt
          <br></br>
          {pages.map(page => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ ml: 5, color: "#0a1b3f", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ ml: "auto", display: { md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
          >
            <FiMenu />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map(page => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
