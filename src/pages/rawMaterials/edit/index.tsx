import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchRawMaterials,
  updateRawMaterial,
} from "../../../store/modules/rawMaterials/rawMaterialsSlice";
import { Container } from "../../../components/container";
import { Card, Button, Spinner, Label, TextInput } from "flowbite-react";

const editRawMaterialSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 letras"),
  stockyQuantity: z.coerce.number().positive("O estoque deve ser positivo"),
  code: z.string(),
});

type EditFormData = z.infer<typeof editRawMaterialSchema>;

export function EditRawMaterials() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items: rawMaterials, loading } = useAppSelector(
    (state) => state.rawMaterials,
  );

  const rawMaterial = rawMaterials.find((rm) => rm.id === id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editRawMaterialSchema),
  });

  useEffect(() => {
    if (rawMaterials.length === 0) {
      dispatch(fetchRawMaterials());
    } else if (rawMaterial) {
      setValue("name", rawMaterial.name);
      setValue("code", rawMaterial.code);
      setValue("stockyQuantity", Number(rawMaterial.stockyQuantity));
    }
  }, [dispatch, rawMaterials.length, rawMaterial, setValue]);

  async function handleUpdate(data: EditFormData) {
    if (!rawMaterial) return;

    try {
      await dispatch(
        updateRawMaterial({
          id: rawMaterial.id,
          name: data.name,
          stockyQuantity: data.stockyQuantity,
        }),
      ).unwrap();

      alert("Matéria-prima atualizada com sucesso!");
      navigate("/rawMaterials");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar.");
    }
  }

  if (loading || !rawMaterial) {
    return (
      <Container>
        <div className="mt-10 flex justify-center">
          <Spinner size="xl" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Editar Insumo
            </h1>
            <Link to="/rawMaterials">
              <Button
                color="light"
                size="sm"
                className="cursor-pointer transition-all"
              >
                Voltar
              </Button>
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="code">Código</Label>
              </div>
              <TextInput
                id="code"
                disabled
                readOnly
                color="gray"
                {...register("code")}
              />
              <span className="text-xs text-gray-500">
                O código não pode ser alterado.
              </span>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Nome do Insumo</Label>
              </div>
              <TextInput
                id="name"
                {...register("name")}
                color={errors.name ? "failure" : "gray"}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="stock">Quantidade em Estoque</Label>
              </div>
              <TextInput
                id="stock"
                type="number"
                step="0.01"
                {...register("stockyQuantity")}
                color={errors.stockyQuantity ? "failure" : "gray"}
              />
              {errors.stockyQuantity && (
                <span className="text-xs text-red-500">
                  {errors.stockyQuantity.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 cursor-pointer transition-all"
            >
              Salvar Alterações
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
}
