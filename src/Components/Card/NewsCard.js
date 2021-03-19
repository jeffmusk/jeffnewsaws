import React from "react";



export default function NewsCard(props) {
  const { data, user, saveNews } = props;

  return (
      <div className=" max-w-xs  max-w-xs rounded
        overflow-hidden shadow-lg my-2 ">
        <div className="relative">

          <div className="rounded-full bg-gray-800 w-14 h-14 flex flex-col items-center justify-center
             shadow-md absolute top-1.5 right-1.5 opacity-70 ">
            <h1 className="font-bold text-white">21</h1>
            <p className="text-white text-xs" >Abril</p>
          </div>
          <img className={'w-full'} src="https://tailwindcss.com/img/card-top.jpg" alt="montaña"/>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </div>
          <p className="text-grey-darker overflow-hidden text-sm text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi enim nam quo. Aliquid dignissimos error ipsa officia recusandae temporibus.
          </p>

        </div>
        <div className="px-6 py-2 flex justify-between ">
          <a href="#" className="text-indigo-500  hover:text-red-400 ">Leer Mas </a>
          <a href="#" className="text-indigo-600  hover:text-red-400 " >Guardar</a>
        </div>
      </div>
    /*<Card className={classes.root}>
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
          <a href={data.web_url} target="_blank" rel="noreferrer">
            Leer Noticias
          </a>
        </Button>
      </CardActions>
    </Card>*/
  );
}
