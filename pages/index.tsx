import { TopSellers } from "../components/TopSellers";

const Index = () => {
  return (
    <div className="grid gap-8">
      <section
        className="hero bg-cover bg-no-repeat h-96"
        style={{ background: `url(https://picsum.photos/1280/720)` }}
      />
      <TopSellers />
    </div>
  );
};

export default Index;
