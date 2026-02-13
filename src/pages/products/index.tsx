import { useEffect } from "react";
import { Link } from "react-router";
import { Container } from "../../components/container";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/modules/products/productsSlice";
import { Button, Card } from "flowbite-react";

export function Products() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container>
      {loading && (
        <div className="flex justify-center p-10">
          <p>Carregando produtos</p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
          <span className="font-medium">Erro!</span>
        </div>
      )}

      <Card className="mx-auto mt-12 max-w-11/12">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
            Produtos
          </h5>
          <Link to="/products/new">
            <Button className="cursor-pointer transition-all">
              Novo produto
            </Button>
          </Link>
        </div>
        <div className="flow-root">
          {Array.isArray(items) &&
            items.map((product) => (
              <ul
                className="divide-y divide-gray-200 border-t-2 border-amber-200 dark:divide-gray-700"
                key={product.id}
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <Link to={`/products/edit/${product.id}`}>
                        <p className="truncate text-base font-semibold text-gray-100">
                          {product.name}
                        </p>
                        <p className="truncate text-base font-semibold text-gray-100">
                          {product.code}
                        </p>
                        <div>
                          {product.materials?.map((item) => (
                            <ul key={item.rawMaterial.id}>
                              <li className="text-gray-400">
                                {item.rawMaterial.code} -{" "}
                                {item.rawMaterial.name} -{" "}
                                {item.requiredQuantity}
                              </li>
                            </ul>
                          ))}
                        </div>
                      </Link>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-100">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(product.price))}
                    </div>
                  </div>
                </li>
              </ul>
            ))}
        </div>
      </Card>
    </Container>
  );
}
