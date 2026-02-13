import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "../../../components/container";
import { addRawMaterial } from "../../../store/modules/rawMaterials/rawMaterialsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Link } from "react-router";
import { Button, Card, FloatingLabel, Spinner } from "flowbite-react";

const createRawMaterialSchema = z.object({
  name: z.string().min(1, "o nome é obrigatório"),
  code: z.string().min(1, "O código é obrigatório"),
  stockyQuantity: z.coerce
    .number("A quantidade é obrigatória")
    .positive("A quantidade precisa ser positivo"),
});

type CreateRawMaterialFormData = z.infer<typeof createRawMaterialSchema>;

export function NewRawMaterials() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.rawMaterials);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRawMaterialSchema),
  });

  async function handleCreateRawMaterial(data: CreateRawMaterialFormData) {
    console.log("teste");
    try {
      await dispatch(addRawMaterial(data)).unwrap();
      alert("Deu certo");
      navigate("/rawMaterials");
    } catch (err) {
      console.log("Falha ao cadastrar", err);
    }
  }

  return (
    <Container>
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-100">Novo insumo</h1>
            <Link to="/rawMaterials">
              <Button color="gray" className="cursor-pointer transition-all">
                Voltar
              </Button>
            </Link>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
              Erro: {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleCreateRawMaterial)}
            className="flex flex-col gap-4"
          >
            <div>
              <FloatingLabel
                variant="filled"
                label="Nome do insumo"
                id="name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-xs text-red-600">
                  {errors.name?.message as string}
                </span>
              )}
            </div>
            <div>
              <FloatingLabel
                variant="filled"
                label="Código do insumo"
                id="code"
                {...register("code")}
              />
              {errors.code && (
                <span className="text-xs text-red-600">
                  {errors.code.message as string}
                </span>
              )}
            </div>
            <div>
              <FloatingLabel
                variant="filled"
                type="number"
                step="0.01"
                label="Quantidade em estoque"
                id="stockyQuantity"
                {...register("stockyQuantity")}
              />
              {errors.stockyQuantity && (
                <span className="text-xs text-red-600">
                  {errors.stockyQuantity?.message as string}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="mt-2 w-full cursor-pointer transition-all"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "cadastrar Insumo"}
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
}
