import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: "20px",
  },
  media: {
    height: 160,
  },
});

export default function NewsCard(props) {
  const { data, user, saveNews } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            data.multimedia.length === 0
              ? "https://www.freeiconspng.com/uploads/no-image-icon-13.png"
              : `https://www.nytimes.com/${data.multimedia[0]?.url}`
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.headline.main}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.abstract}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {user && (
          <Button
            size="small"
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              saveNews(data);
            }}
          >
            Guardar
          </Button>
        )}

        <Button size="small" color="primary">
          <a href={data.web_url} target="_blank">
            Leer Noticias
          </a>
        </Button>
      </CardActions>
    </Card>
  );
}
