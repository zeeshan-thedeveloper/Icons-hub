import Layout from "../Components/layout";
const Index = () => {
  return (
    <div style={{ width: "100%", height: "100%", padding: "10%" }}>
      Disclaimer
    </div>
  );
};
export default Index;

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
