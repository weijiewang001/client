import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Product } from "../../app/models/product"
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log())
      .finally(() => setLoading(false))
  }

  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: { fontWeight: 'bold', color: 'text.primary' }
          }}
        />
        <CardMedia
          sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'background.delt' }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color="secondary" variant="h5">
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            size="small"
            onClick={() => handleAddItem(product.id)}
          >
            Add to cart
          </LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}