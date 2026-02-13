import { useEffect } from "react";
import { Link } from "react-router";
import { Container } from "../../components/container";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchRawMaterials } from "../../store/modules/rawMaterials/rawMaterialsSlice";
import { Button, Card } from "flowbite-react";

export function RawMaterials() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.rawMaterials,
  );

  useEffect(() => {
    dispatch(fetchRawMaterials());
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
            Matéria prima
          </h5>
          <Link to="/rawMaterials/new">
            <Button className="cursor-pointer transition-all">
              Nova matéria prima
            </Button>
          </Link>
        </div>
        <div className="flow-root">
          {Array.isArray(items) &&
            items.map((rawMaterial) => (
              <ul
                className="divide-y divide-gray-200 border-t-2 border-amber-200 dark:divide-gray-700"
                key={rawMaterial.id}
              >
                <li className="py-3 sm:py-4">
                  <Link to={`/rawMaterials/edit/${rawMaterial.id}`}>
                    <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-semibold text-gray-100">
                        {rawMaterial.name}
                      </p>
                      <p className="truncate text-base font-medium text-gray-100">
                        {rawMaterial.code}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-100">
                      Estoque: {rawMaterial.stockyQuantity}
                    </div>
                  </div>
                  </Link>
                </li>
              </ul>
            ))}
        </div>
      </Card>
    </Container>
  );
}
