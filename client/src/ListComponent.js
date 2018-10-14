import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: "auto",
    marginTop: 22,
    maxWidth: "80%",
    backgroundColor: theme.palette.background.paper,
  },
});

function SimpleList(props) {
  const { classes, devices, onOpenModal } = props;
  const Subscribers = devices.map((user, i) => {
    const date = user.registrationDate.replace(/T/, ' ').replace(/\..+/, '');
    return (
      <ListItem button key={i}>
        <ListItemIcon>
          <DraftsIcon/>
        </ListItemIcon>
          <ListItemText 
            style={{ "width": "100%", "height": "18%" }}
            primary={user.name + ' : ' + user.os + ' : ' + date}
            token={user.token}
          />
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <List component="nav" onClick={onOpenModal}>
        {Subscribers}
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
