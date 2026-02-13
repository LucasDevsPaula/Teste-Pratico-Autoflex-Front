import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import api from "../../server/api";
import { Card } from "flowbite-react";

interface ProductsAvaliable {
  code: string;
  name: string;
  price: string;
  max_production: number;
  possible_revenue: number;
}

export function Home() {
  const [products, setProducts] = useState<ProductsAvaliable[]>([]);

  useEffect(() => {
    async function loadingProducts() {
      try {
        const res = await api.get("/products/avaliable");
        console.log(res.data);
        let dados = [];
        dados = res.data;
        setProducts(dados);
      } catch (err) {
        console.log(`Erro: ${err}`);
      }
    }

    loadingProducts();
  }, []);

  return (
    <Container>
      <Card className="mx-auto mt-12 max-w-11/12">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
            Previsão de produção
          </h5>
        </div>
        <div className="flow-root">
            {products.map((product) => (
          <ul className="divide-y divide-gray-200 border-t-2 border-amber-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="truncate text-gray-500 dark:text-gray-400">
                    Código: {product.code}
                  </p>
                  <p className="truncate text-gray-500 dark:text-gray-400">
                    Máximo a ser produzido: {product.max_production}
                  </p>
                  <p className="truncate text-gray-500 dark:text-gray-400">
                    Possível valor de venda total: {product.possible_revenue.toFixed(2)}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
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
