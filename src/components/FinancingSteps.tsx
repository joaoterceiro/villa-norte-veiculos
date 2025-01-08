const steps = [
  {
    number: "01",
    title: "Escolha seu carro ideal",
    description: "Navegue pelo nosso estoque e selecione o carro dos seus sonhos",
  },
  {
    number: "02",
    title: "Complete Seu Formulário",
    description: "Envie os seus dados e preencha sua proposta em poucos minutos",
  },
  {
    number: "03",
    title: "Receba a Análise da Simulação",
    description:
      "Nossa equipe entrará em contato rapidamente com a simulação da sua proposta",
  },
];

export const FinancingSteps = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-2">
          FÁCIL E RÁPIDO
        </h2>
        <p className="text-center text-muted mb-12">
          Simule seu financiamento em 3 passos simples
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl font-bold text-primary mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};