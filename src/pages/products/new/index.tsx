import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "../../../components/container";
import { addProduct } from "../../../store/modules/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Link } from "react-router";
import { Button, Card, FloatingLabel, Spinner } from "flowbite-react";

const createProductSchema = z.object({
  name: z.string().min(1, "o nome é obrigatório"),
  code: z.string().min(1, "O código é obrigatório"),
  price: z.coerce
    .number("O preço é obrigatório")
    .positive("O preço precisa ser positivo"),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function NewProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.products);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  async function handleCreateProduct(data: CreateProductFormData) {
    try {
      await dispatch(addProduct(data)).unwrap();
      alert("Deu certo");
      navigate("/products");
    } catch (err) {
      console.log("Falha ao cadastrar", err);
    }
  }

  return (
    <Container>
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-100">Novo Produto</h1>
            <Link to="/products">
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
            onSubmit={handleSubmit(handleCreateProduct)}
            className="flex flex-col gap-4"
          >
            <div>
              <FloatingLabel
                variant="filled"
                label="Nome do produto"
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
                label="Código do produto"
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
                label="Preço (R$)"
                id="price"
                {...register("price")}
              />
              {errors.price && (
                <span className="text-xs text-red-600">
                  {errors.price?.message as string}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="mt-2 w-full cursor-pointer transition-all"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "cadastrar Produto"}
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
}
