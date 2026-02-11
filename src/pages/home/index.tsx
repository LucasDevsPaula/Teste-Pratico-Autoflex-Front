// import { useEffect, useState } from "react";
import { Container } from "../../components/container";
// import api from "../../server/api";
// import { Card } from "flowbite-react";

// interface ProductsAvaliable {
//   code: string;
//   name: string;
//   price: string;
//   max_production: number;
//   possible_revenue: number;
// }

export function Home() {
  // const [products, setProducts] = useState<ProductsAvaliable[]>([]);

  // useEffect(() => {
  //   async function loadingProducts() {
  //     try {
  //       const res = await api.get("/products/avaliable");
  //       console.log(res.data);
  //       let dados = [];
  //       dados = res.data;
  //       setProducts(dados);
  //     } catch (err) {
  //       console.log(`Erro: ${err}`);
  //     }
  //   }

  //   loadingProducts();
  // }, []);

  return (
    <Container>
      <h1>Home - lista de produtos que podem ser feitos</h1>
      {/* <Card className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
            Previsão de produ
          </h5>
          <a
            href="#"
            className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
            View all
          </a>
        </div>
        <div className="flow-root">
            {products.map((product) => (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {product.code}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {product.max_production}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {product.price} R$
                </div>
              </div>
            </li>
          </ul>
        ))}
        </div>
      </Card> */}
    </Container>
  );
}
