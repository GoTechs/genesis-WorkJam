import React from "react";
import { Trans, withNamespaces } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import "./styles.sass";

const story = props => {
  const randomImage = Math.floor(Math.random() * 11);
  const imgage = require(`../../assets/images/${randomImage}.png`);

  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: "100%",
      margin: 15
    },
    media: {
      height: 0,
      paddingTop: "56.25%"
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  }));
  const { story, expanded, handleExpandClick, comments, iteration, j } = props;
  const classes = useStyles();
  let commentIt = 0;

  return (
    <div className="list-container">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {iteration}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={story.by}
          subheader={story.time}
        />
        <CardMedia
          className={classes.media}
          image={imgage}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {story.title}
          </Typography>
          <a href={story.url}>About Us </a>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <MoreHorizIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={() => handleExpandClick(story.kids, story.id)}
            aria-expanded={expanded && props.expandedId === story.id}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse
          in={expanded && props.expandedId === story.id}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <Typography paragraph>Comments</Typography>
            {comments &&
              comments.map((comment, key) => {
                commentIt++;
                return (
                  <List className={classes.root} key={key}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={j}>{commentIt}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.by}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            />
                            {props.strip(comment.text)}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                );
              })}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default withNamespaces("story")(story);
