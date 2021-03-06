import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
import DashboardIcon from "@material-ui/icons/Dashboard";

import { logOutUser } from "redux/actions/user";
import { RootState } from "redux/reducers";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonClose: {
    marginLeft: theme.spacing(0),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

type Props = {
  children: JSX.Element;
};

const PersistentDrawerLeft: React.FC<Props> = ({ children }): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const topLinks =
    user.isAuthenticated ? (<>
      <ListItem
        button
        key='dashboard'
        onClick={(e) => history.push("/dashboard")}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>

      <ListItem button key='users' onClick={(e) => history.push("/users")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Users' />
      </ListItem>

      <ListItem button key='modules' onClick={(e) => history.push("/modules")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Modules' />
      </ListItem>
      <ListItem button key='submodules' onClick={(e) => history.push("/submodules")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='SubModules' />
      </ListItem>
      <ListItem button key='submodulesroutes' onClick={(e) => history.push("/submodulesroutes")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Submodulesroutes' />
      </ListItem>
      <ListItem button key='organizations' onClick={(e) => history.push("/organization")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Organizations' />
      </ListItem>

      <ListItem button key='branches' onClick={(e) => history.push("/branches")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Branches' />
      </ListItem>
    </>) : null;

  const bottomLinks = user.isAuthenticated ? (
    <ListItem button key='logout' onClick={(e) => { handleDrawerClose(); dispatch(logOutUser()) }}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary='Logout' />
    </ListItem>
  ) : (null
    // <>
    //   <ListItem
    //     button
    //     key='register'
    //     onClick={(e) => history.push("/register")}
    //   >
    //     <ListItemIcon>
    //       <LockOpenIcon />
    //     </ListItemIcon>
    //     <ListItemText primary='Register' />
    //   </ListItem>
    //   <ListItem button key='login' onClick={(e) => history.push("/")}>
    //     <ListItemIcon>
    //       <VpnKeyIcon />
    //     </ListItemIcon>
    //     <ListItemText primary='Login' />
    //   </ListItem>
    // </>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {user.isAuthenticated ? (<IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>) : null}
          <Typography variant='h6' noWrap>
            CTRLcampus
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {user.isAuthenticated ? (<div className={classes.drawerHeader}>
          <IconButton
            color='inherit'
            aria-label='close drawer'
            onClick={handleDrawerClose}
            edge='start'
            className={clsx(
              classes.menuButton,
              open ? classes.menuButtonClose : classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
        </div>) : null}
        <Divider />
        <List>{topLinks}</List>
        {topLinks ? <Divider /> : null}
        <List>{bottomLinks}</List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default PersistentDrawerLeft;
