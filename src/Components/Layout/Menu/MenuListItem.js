import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    Link: {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.87)'
    },
  }));

const MenuListItem = ({ text, to, icon }) => {

    const classes = useStyles();

    return (
        <Link to={to} className={classes.Link}>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        </Link>
    );
}

export default MenuListItem;
