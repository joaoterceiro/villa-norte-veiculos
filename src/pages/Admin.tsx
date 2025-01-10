import { AdminLayout } from "@/layouts/AdminLayout";

const Admin = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Total de Veículos
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Leads do Mês
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Veículos em Destaque
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Veículos Vendidos
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;