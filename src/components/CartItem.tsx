import { Button, Stack } from "react-bootstrap";
import storeItems from "../data/items.json";
import formatCurrency from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type TCartItem = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: TCartItem) {
  const { handleRemove } = useShoppingCart();

  const item = storeItems.find((i) => i.id === id);
  if (item === undefined) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted fw-bold" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => handleRemove(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
