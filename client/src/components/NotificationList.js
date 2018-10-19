import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';

import { connect } from 'react-redux';
import { changeModal } from '../actions';


const styles = theme => ({
  root: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: "auto",
    marginTop: 22,
    maxWidth: "83%",
    backgroundColor: theme.palette.background.paper,
  },
});

const NotificationList = ({ classes, notifications, onOpenModal }) => {
  const Notifications = notifications.map((notification, i) => {
    const date = notification.sentDate.replace(/T/, ' ').replace(/\..+/, '');
    return (
      <ListItem button key={i} onClick={onOpenModal}>
        <ListItemIcon>
          <DraftsIcon/>
        </ListItemIcon>
          <ListItemText 
            style={{ "width": "100%", "height": "18%" }}
            primary={notification._id + ' : ' + date}
          />
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <List component="nav">
        {Notifications}
      </List>
    </div>
  );
}

NotificationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ListWithStyles = withStyles(styles)(NotificationList);

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  onOpenModal: (e) => {
    const token = e.currentTarget.childNodes[1].getAttribute('token');
    dispatch(changeModal(true, token));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWithStyles);
