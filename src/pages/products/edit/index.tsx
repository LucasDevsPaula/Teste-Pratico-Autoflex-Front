import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchProducts,
  addProductMaterial,
  updateProductMaterial,
} from "../../../store/modules/products/productsSlice";
import { fetchRawMaterials } from "../../../store/modules/rawMaterials/rawMaterialsSlice";
import { Container } from "../../../components/container";
import {
  Card,
  Button,
  Spinner,
  Select,
  Label,
  TextInput,
} from "flowbite-react";

const compositionSchema = z.object({
  codeRawMaterial: z.string().min(1, "Selecione um insumo"),
  quantity: z.coerce.number().positive("Quantidade deve ser maior que 0"),
});

type CompositionFormData = z.infer<typeof compositionSchema>;

export function EditProduct() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [editingMaterialCode, setEditingMaterialCode] = useState<string | null>(
    null,
  );

  const { items: products, loading } = useAppSelector(
    (state) => state.products,
  );
  const { items: rawMaterials } = useAppSelector((state) => state.rawMaterials);

  const product = products.find((p) => p.id === id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(compositionSchema),
  });

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
  }, [dispatch, products.length]);

  async function handleSaveComposition(data: CompositionFormData) {
    if (!product) return;

    try {
      if (editingMaterialCode) {
        const currentMaterials = product.materials || [];
        const newMaterialList = currentMaterials.map((item) => {
          if (item.rawMaterial.code === editingMaterialCode) {
            return {
              codeRawMaterial: item.rawMaterial.code,
              requiredQuantity: data.quantity,
            };
          }
          return {
            codeRawMaterial: item.rawMaterial.code,
            requiredQuantity: item.requiredQuantity,
          };
        });
        await dispatch(
          updateProductMaterial({
            codeProduct: product.code,
            materials: newMaterialList,
          }),
        ).unwrap();
      } else {
        await dispatch(
          addProductMaterial({
            codeProduct: product.code,
            materials: [
              {
                codeRawMaterial: data.codeRawMaterial,
                requiredQuantity: data.quantity,
              },
            ],
          }),
        ).unwrap();
      }

      reset();
      setEditingMaterialCode(null);
      dispatch(fetchProducts());
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar.");
    }
  }

  function handleStartEdit(materialItem: any) {
    setEditingMaterialCode(materialItem.rawMaterial.code);

    setValue("codeRawMaterial", materialItem.rawMaterial.code);
    setValue("quantity", materialItem.requiredQuantity);
  }

  function handleCancelEdit() {
    setEditingMaterialCode(null);
    reset();
  }

  if (loading || !product)
    return (
      <Container>
        <div className="mt-10 flex justify-center">
          <Spinner size="xl" />
        </div>
      </Container>
    );

  const customButtonTheme = {
    color: {
      add: "text-white bg-blue-400 border-none hover:bg-blue-500 transition-all cursor-pointer",
      edit: "text-white bg-amber-300 hover:bg-amber-400 transition-all cursor-pointer",
    },
  };

  return (
    <Container>
      <Card className="mx-auto mt-12 max-w-11/12">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
            Gerenciar Receita{" "}
            <span className="text-blue-600">{product.name}</span>
          </h5>
          <Link to="/products">
            <Button className="cursor-pointer transition-all">voltar</Button>
          </Link>
        </div>
        <div
          className={
            editingMaterialCode
              ? "border-l-4 border-l-amber-400 pl-3"
              : "border-l-4 border-l-blue-400 pl-2"
          }
        >
          <div className="mb-2 flex items-center justify-between">
            <h2
              className={
                editingMaterialCode
                  ? "text-lg font-bold text-amber-200"
                  : "text-lg font-bold text-blue-200"
              }
            >
              {editingMaterialCode
                ? "✏️  Editando Quantidade"
                : "➕  Adicionar Ingrediente"}
            </h2>
            {editingMaterialCode && (
              <Button
                size="xs"
                color="light"
                className="cursor-pointer transition-all"
                onClick={handleCancelEdit}
              >
                Cancelar Edição
              </Button>
            )}
          </div>
          <form
            onSubmit={handleSubmit(handleSaveComposition)}
            className="flex flex-wrap items-end gap-4"
          >
            <div className="min-w-50 flex-1">
              <Label htmlFor="rm">Matéria Prima</Label>
              <div
                className={
                  editingMaterialCode ? "pointer-events-none opacity-60" : ""
                }
              >
                <Select id="rm" {...register("codeRawMaterial")}>
                  <option value="">Selecione...</option>
                  {rawMaterials.map((rm) => (
                    <option key={rm.id} value={rm.code}>
                      {rm.name}-{rm.code} (Estoque: {rm.stockyQuantity})
                    </option>
                  ))}
                </Select>
              </div>
              {errors.codeRawMaterial && (
                <span className="text-xs text-red-500">
                  {errors.codeRawMaterial.message as string}
                </span>
              )}
            </div>
            <div className="w-37.5">
              <Label htmlFor="qtd">Quantidade</Label>
              <TextInput
                id="qtd"
                type="number"
                step="0.01"
                {...register("quantity")}
              />
              {errors.quantity && (
                <span className="text-xs text-red-500">
                  {errors.quantity.message as string}
                </span>
              )}
            </div>

            <Button
              type="submit"
              theme={customButtonTheme}
              color={editingMaterialCode ? "edit" : "add"}
              className="cursor-pointer transition-all"
            >
              {editingMaterialCode
                ? "Atualizar Quantidade"
                : "Adicionar à Receita"}
            </Button>
          </form>
        </div>
        <div className="overflow-x-auto mt-4">
          {product.materials && product.materials.length > 0 ? (
            product.materials.map((item) => (
              <ul key={item.rawMaterial.id}>
                <div className="mb-2 flex justify-between text-2xl text-gray-200">
                  <li className="w-1/2 text-center first-letter:uppercase">
                    {item.rawMaterial.name}
                  </li>
                  <li className="w-[15%] text-center">
                    {item.requiredQuantity}
                  </li>
                  <div className="mx-auto w-[2%]">
                    <Button
                      size="xs"
                      color="yellow"
                      className="cursor-pointer transition-all"
                      onClick={() => handleStartEdit(item)}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </ul>
            ))
          ) : (
            <div>
              <h2 className="text-gray-200">
                Nenhum ingrediente adicionado ainda.
              </h2>
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
}
