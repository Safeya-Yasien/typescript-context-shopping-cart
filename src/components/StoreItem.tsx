import { Button, Card } from "react-bootstrap";
import formatCurrency from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type TStoreItemsProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: TStoreItemsProps) {
  const { getItemQuantity, handleIncrement, handleDecrement, handleRemove } =
    useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        src={imgUrl}
        alt={name}
        variant="top"
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100  mb-3" onClick={() => handleIncrement(id)}>
              Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button size="sm" onClick={() => handleDecrement(id)}>
                  -
                </Button>
                <div>
                  <span className="fs-4">{quantity}</span>
                </div>
                <Button size="sm" onClick={() => handleIncrement(id)}>
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                className="w-100"
                onClick={() => handleRemove(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
