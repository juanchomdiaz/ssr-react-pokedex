export default function PokedexPage({ pokemons }) {
  return (
    <PokedexState pokemons={pokemons}>
      <HelpWizardMain orderId={orderId} />
    </PokedexState>
  );
}

export const getServerSideProps = async ({ query }) => {
  const orderId = query['orderId'];
  const issuesTree = await issuesService.getIssuesTree();
  const provinces = provincesService.getArgentineProvinces();

  return {
    props: { issuesTree, orderId, provinces },
  };
};
